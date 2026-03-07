import { http } from 'msw';

import { EnvManager } from '@/shared/lib';

import {
  type EvaluatorFixture,
  applicationsStore,
  evaluationsStore,
  evaluatorsStore,
  formsStore,
} from '../fixtures';
import { MockDelayManager, MockErrorSimulator, MockResponseManager } from '../utils';

const BASE_URL = EnvManager.getAppEnv('VITE_API_BASE_URL') || '';
const API_PREFIX = `${BASE_URL}/api/v1`;

export const evaluatorsHandlers = [
  /**
   * GET /api/v1/evaluators - 전체 평가자 현황 (대시보드용)
   * 모든 폼의 평가자를 집계하여 반환
   */
  http.get(`${API_PREFIX}/evaluators`, async () => {
    await MockDelayManager.random('fast');

    const evaluatorMap = new Map<string, {
      id: string;
      name: string;
      email: string;
      role: string;
      assignedForms: Array<{ formId: string; title: string; progress: number }>;
      lastActive: string;
    }>();

    for (const evaluator of evaluatorsStore) {
      const form = formsStore.find(f => f.id === evaluator.formId);
      const formTitle = form?.title ?? '알 수 없는 공고';

      const formEvaluations = evaluationsStore.filter(
        e => e.evaluatorId === evaluator.id && e.formId === evaluator.formId,
      );
      const totalApps = evaluator.assignedApplicationIds.length;
      const completedEvals = formEvaluations.filter(e => e.status === 'COMPLETED').length;
      const progress = totalApps > 0 ? Math.round((completedEvals / totalApps) * 100) : 0;

      const existing = evaluatorMap.get(evaluator.email);
      if (existing) {
        existing.assignedForms.push({ formId: evaluator.formId, title: formTitle, progress });
        if (evaluator.updatedAt > existing.lastActive) {
          existing.lastActive = evaluator.updatedAt;
        }
      } else {
        evaluatorMap.set(evaluator.email, {
          id: evaluator.id,
          name: evaluator.name,
          email: evaluator.email,
          role: evaluator.role,
          assignedForms: [{ formId: evaluator.formId, title: formTitle, progress }],
          lastActive: evaluator.updatedAt,
        });
      }
    }

    const data = Array.from(evaluatorMap.values());
    return MockResponseManager.success(data);
  }),

  /**
   * GET /api/v1/forms/:formId/evaluators - 공고의 평가자 목록 조회
   * 에러 케이스: 404 FORM_NOT_FOUND
   */
  http.get(`${API_PREFIX}/forms/:formId/evaluators`, async ({ params }) => {
    await MockDelayManager.random('fast');

    const { formId } = params;
    const form = formsStore.find(f => f.id === formId);

    if (!form) {
      return MockResponseManager.error('FORM_NOT_FOUND');
    }

    const evaluators = evaluatorsStore.filter(e => e.formId === formId);

    return MockResponseManager.success(evaluators);
  }),

  /**
   * POST /api/v1/forms/:formId/evaluators - 평가자 추가
   * 에러 케이스: 404 FORM_NOT_FOUND, 400 VALIDATION_ERROR
   */
  http.post(`${API_PREFIX}/forms/:formId/evaluators`, async ({ params, request }) => {
    await MockDelayManager.random('normal');

    const { formId } = params;
    const form = formsStore.find(f => f.id === formId);

    if (!form) {
      return MockResponseManager.error('FORM_NOT_FOUND');
    }

    // Random validation error
    const randomError = MockErrorSimulator.maybeError('VALIDATION_ERROR');
    if (randomError) {
      return randomError;
    }

    const body = (await request.json()) as Partial<EvaluatorFixture>;

    const newEvaluator: EvaluatorFixture = {
      id: `evaluator-${Date.now()}`,
      formId: formId as string,
      name: body.name ?? '이름 없음',
      email: body.email ?? 'unknown@example.com',
      role: body.role ?? 'EVALUATOR',
      assignedApplicationIds: [],
      assignedQuestionIds: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    evaluatorsStore.push(newEvaluator);

    return MockResponseManager.success(newEvaluator, { status: 201 });
  }),

  /**
   * DELETE /api/v1/evaluators/:evaluatorId - 평가자 삭제
   * 에러 케이스: 404 EVALUATOR_NOT_FOUND, 409 HAS_EVALUATIONS
   */
  http.delete(`${API_PREFIX}/evaluators/:evaluatorId`, async ({ params }) => {
    await MockDelayManager.random('fast');

    const { evaluatorId } = params;
    const evaluatorIndex = evaluatorsStore.findIndex(e => e.id === evaluatorId);

    if (evaluatorIndex === -1) {
      return MockResponseManager.error('EVALUATOR_NOT_FOUND');
    }

    // Check if evaluator has existing evaluations
    const hasEvaluations = evaluationsStore.some(e => e.evaluatorId === evaluatorId);

    if (hasEvaluations) {
      return MockResponseManager.error('HAS_EVALUATIONS');
    }

    evaluatorsStore.splice(evaluatorIndex, 1);

    return MockResponseManager.success({ deleted: true });
  }),

  /**
   * POST /api/v1/forms/:formId/evaluators/assign - 지원서 배정
   * 에러 케이스: 404 FORM_NOT_FOUND, 400 NO_APPLICATIONS
   */
  http.post(`${API_PREFIX}/forms/:formId/evaluators/assign`, async ({ params, request }) => {
    await MockDelayManager.random('slow');

    const { formId } = params;
    const form = formsStore.find(f => f.id === formId);

    if (!form) {
      return MockResponseManager.error('FORM_NOT_FOUND');
    }

    const formApplications = applicationsStore.filter(a => a.formId === formId);

    if (formApplications.length === 0) {
      return MockResponseManager.error('NO_APPLICATIONS');
    }

    const body = (await request.json()) as {
      assignments: Array<{
        evaluatorId: string;
        applicationIds: string[];
        questionIds?: string[];
      }>;
    };

    // Process assignments
    const results: EvaluatorFixture[] = [];

    for (const assignment of body.assignments) {
      const evaluator = evaluatorsStore.find(e => e.id === assignment.evaluatorId);
      if (evaluator) {
        evaluator.assignedApplicationIds = [
          ...new Set([...evaluator.assignedApplicationIds, ...assignment.applicationIds]),
        ];
        if (assignment.questionIds) {
          evaluator.assignedQuestionIds = [
            ...new Set([...evaluator.assignedQuestionIds, ...assignment.questionIds]),
          ];
        }
        evaluator.updatedAt = new Date().toISOString();
        results.push(evaluator);
      }
    }

    return MockResponseManager.success(results);
  }),
];
