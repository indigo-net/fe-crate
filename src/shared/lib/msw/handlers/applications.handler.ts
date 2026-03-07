import { http } from 'msw';

import { EnvManager } from '@/shared/lib';

import { type ApplicationFixture, applicationsStore, formsStore } from '../fixtures';
import { MockDelayManager, MockResponseManager } from '../utils';

const BASE_URL = EnvManager.getAppEnv('VITE_API_BASE_URL') || '';
const API_PREFIX = `${BASE_URL}/api/v1`;

export const applicationsHandlers = [
  /**
   * GET /api/v1/forms/:formId/applications - 공고의 지원서 목록 조회
   * 에러 케이스: 404 FORM_NOT_FOUND, 403 FORM_NOT_CLOSED
   */
  http.get(`${API_PREFIX}/forms/:formId/applications`, async ({ params, request }) => {
    await MockDelayManager.random('normal');

    const { formId } = params;
    const form = formsStore.find(f => f.id === formId);

    if (!form) {
      return MockResponseManager.error('FORM_NOT_FOUND');
    }

    // Only CLOSED forms can view applications
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

    const formApplications = applicationsStore.filter(a => a.formId === formId);
    const total = formApplications.length;
    const startIndex = (page - 1) * limit;
    const paginatedApplications = formApplications.slice(startIndex, startIndex + limit);

    return MockResponseManager.success(paginatedApplications, {
      pagination: { page, limit, total },
    });
  }),

  /**
   * GET /api/v1/applications/:applicationId - 지원서 상세 조회
   * 에러 케이스: 404 APPLICATION_NOT_FOUND
   */
  http.get(`${API_PREFIX}/applications/:applicationId`, async ({ params }) => {
    await MockDelayManager.random('fast');

    const { applicationId } = params;
    const application = applicationsStore.find(a => a.id === applicationId);

    if (!application) {
      return MockResponseManager.error('APPLICATION_NOT_FOUND');
    }

    return MockResponseManager.success(application);
  }),

  /**
   * POST /api/v1/forms/:formId/applications - 지원서 제출
   * 에러 케이스: 404 FORM_NOT_FOUND, 410 FORM_CLOSED
   */
  http.post(`${API_PREFIX}/forms/:formId/applications`, async ({ params, request }) => {
    await MockDelayManager.random('slow');

    const { formId } = params;
    const form = formsStore.find(f => f.id === formId);

    if (!form) {
      return MockResponseManager.error('FORM_NOT_FOUND');
    }

    // Only PUBLISHED forms accept applications
    if (form.status !== 'PUBLISHED') {
      return MockResponseManager.error('FORM_CLOSED');
    }

    const body = (await request.json()) as Partial<ApplicationFixture>;

    const newApplication: ApplicationFixture = {
      id: `app-${Date.now()}`,
      formId: formId as string,
      applicantName: body.applicantName ?? '이름 없음',
      applicantEmail: body.applicantEmail ?? 'unknown@example.com',
      status: 'SUBMITTED',
      answers: body.answers ?? [],
      submittedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    applicationsStore.push(newApplication);

    return MockResponseManager.success(newApplication, { status: 201 });
  }),
];
