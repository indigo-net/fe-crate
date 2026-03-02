import { http } from 'msw';

import { EnvManager } from '@/shared/lib';

import {
  type EvaluationFixture,
  applicationsStore,
  evaluationsStore,
  formsStore,
} from '../fixtures';
import { MockDelayManager, MockResponseManager } from '../utils';

const BASE_URL = EnvManager.getAppEnv('VITE_API_BASE_URL') || '';
const API_PREFIX = `${BASE_URL}/api/v1`;

export const evaluationsHandlers = [
  /**
   * GET /api/v1/forms/:formId/evaluations - 공고의 평가 목록 조회
   * 에러 케이스: 404 FORM_NOT_FOUND, 403 FORM_NOT_CLOSED
   */
  http.get(`${API_PREFIX}/forms/:formId/evaluations`, async ({ params, request }) => {
    await MockDelayManager.random('normal');

    const { formId } = params;
    const form = formsStore.find(f => f.id === formId);

    if (!form) {
      return MockResponseManager.error('FORM_NOT_FOUND');
    }

    // Only CLOSED forms can view evaluations
    if (form.status !== 'CLOSED') {
      return MockResponseManager.error('FORM_NOT_CLOSED');
    }

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') ?? '1', 10);
    const limit = parseInt(url.searchParams.get('limit') ?? '10', 10);

    // Validate pagination params
    if (!Number.isFinite(page) || page < 1 || !Number.isFinite(limit) || limit < 1) {
      return MockResponseManager.error('VALIDATION_ERROR', { message: 'Invalid pagination params' });
    }

    const formEvaluations = evaluationsStore.filter(e => e.formId === formId);
    const total = formEvaluations.length;
    const startIndex = (page - 1) * limit;
    const paginatedEvaluations = formEvaluations.slice(startIndex, startIndex + limit);

    return MockResponseManager.success(paginatedEvaluations, {
      pagination: { page, limit, total },
    });
  }),

  /**
   * POST /api/v1/applications/:appId/evaluations - 평가 생성
   * 에러 케이스: 404 APPLICATION_NOT_FOUND, 409 ALREADY_EVALUATED
   */
  http.post(`${API_PREFIX}/applications/:appId/evaluations`, async ({ params, request }) => {
    await MockDelayManager.random('normal');

    const { appId } = params;
    const application = applicationsStore.find(a => a.id === appId);

    if (!application) {
      return MockResponseManager.error('APPLICATION_NOT_FOUND');
    }

    // Check if already evaluated by checking existing evaluation
    const body = (await request.json()) as Partial<EvaluationFixture>;

    // Validate evaluatorId is required
    if (!body.evaluatorId) {
      return MockResponseManager.error('MISSING_EVALUATOR_ID');
    }

    const existingEvaluation = evaluationsStore.find(
      e => e.applicationId === appId && e.evaluatorId === body.evaluatorId,
    );

    if (existingEvaluation) {
      return MockResponseManager.error('ALREADY_EVALUATED');
    }

    const form = formsStore.find(f => f.id === application.formId);

    const newEvaluation: EvaluationFixture = {
      id: `eval-${Date.now()}`,
      applicationId: appId as string,
      evaluatorId: body.evaluatorId,
      formId: application.formId,
      status: 'PENDING',
      scores: [],
      totalScore: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    evaluationsStore.push(newEvaluation);

    // Update application status if form is closed
    if (form?.status === 'CLOSED') {
      application.status = 'UNDER_REVIEW';
      application.updatedAt = new Date().toISOString();
    }

    return MockResponseManager.success(newEvaluation, { status: 201 });
  }),

  /**
   * PATCH /api/v1/evaluations/:evaluationId - 평가 수정
   * 에러 케이스: 404 (implied), 403 NOT_ASSIGNED
   */
  http.patch(`${API_PREFIX}/evaluations/:evaluationId`, async ({ params, request }) => {
    await MockDelayManager.random('normal');

    const { evaluationId } = params;
    const evaluationIndex = evaluationsStore.findIndex(e => e.id === evaluationId);

    if (evaluationIndex === -1) {
      return MockResponseManager.error('EVALUATION_NOT_FOUND');
    }

    const evaluation = evaluationsStore[evaluationIndex];
    const body = (await request.json()) as Partial<EvaluationFixture> & {
      requestingEvaluatorId?: string;
    };

    // Check if requester is assigned to this evaluation (required)
    if (!body.requestingEvaluatorId || body.requestingEvaluatorId !== evaluation.evaluatorId) {
      return MockResponseManager.error('NOT_ASSIGNED');
    }

    const updatedEvaluation: EvaluationFixture = {
      ...evaluation,
      scores: body.scores ?? evaluation.scores,
      totalScore: body.totalScore ?? evaluation.totalScore,
      overallComment: body.overallComment ?? evaluation.overallComment,
      status: body.status ?? evaluation.status,
      updatedAt: new Date().toISOString(),
    };

    evaluationsStore[evaluationIndex] = updatedEvaluation;

    // Update application status if evaluation is completed
    if (updatedEvaluation.status === 'COMPLETED') {
      const application = applicationsStore.find(a => a.id === evaluation.applicationId);
      if (application) {
        application.status = 'EVALUATED';
        application.updatedAt = new Date().toISOString();
      }
    }

    return MockResponseManager.success(updatedEvaluation);
  }),
];
