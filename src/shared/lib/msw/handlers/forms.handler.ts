import { http } from 'msw';

import { EnvManager } from '@/shared/lib';

import { type FormFixture, formsStore } from '../fixtures';
import { MockDelayManager, MockErrorSimulator, MockResponseManager } from '../utils';

const BASE_URL = EnvManager.getAppEnv('VITE_API_BASE_URL') || '';
const API_PREFIX = `${BASE_URL}/api/v1`;

export const formsHandlers = [
  /**
   * GET /api/v1/forms - 공고 목록 조회
   * 에러 케이스: 503 SERVICE_UNAVAILABLE (1/50)
   */
  http.get(`${API_PREFIX}/forms`, async () => {
    await MockDelayManager.random('normal');

    const randomError = MockErrorSimulator.maybeError('SERVICE_UNAVAILABLE');
    if (randomError) return randomError;

    const forms = formsStore.map(form => ({
      id: form.id,
      title: form.title,
      description: form.description,
      status: form.status,
      startDate: form.startDate,
      endDate: form.endDate,
      createdAt: form.createdAt,
      updatedAt: form.updatedAt,
    }));

    return MockResponseManager.success(forms);
  }),

  /**
   * GET /api/v1/forms/:formId - 공고 상세 조회
   * 에러 케이스: 404 FORM_NOT_FOUND
   */
  http.get(`${API_PREFIX}/forms/:formId`, async ({ params }) => {
    await MockDelayManager.random('fast');

    const { formId } = params;
    const form = formsStore.find(f => f.id === formId);

    if (!form) {
      return MockResponseManager.error('FORM_NOT_FOUND');
    }

    return MockResponseManager.success(form);
  }),

  /**
   * POST /api/v1/forms - 공고 생성
   * 에러 케이스: 400 VALIDATION_ERROR (1/50)
   */
  http.post(`${API_PREFIX}/forms`, async ({ request }) => {
    await MockDelayManager.random('normal');

    const randomError = MockErrorSimulator.maybeError('VALIDATION_ERROR');
    if (randomError) return randomError;

    const body = (await request.json()) as Partial<FormFixture>;

    const newForm: FormFixture = {
      id: `form-${Date.now()}`,
      title: body.title ?? '제목 없음',
      description: body.description ?? '',
      status: 'DRAFT',
      startDate: null,
      endDate: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    formsStore.push(newForm);

    return MockResponseManager.success(newForm, { status: 201 });
  }),

  /**
   * PATCH /api/v1/forms/:formId - 공고 수정
   * 에러 케이스: 404 FORM_NOT_FOUND, 409 FORM_NOT_DRAFT
   */
  http.patch(`${API_PREFIX}/forms/:formId`, async ({ params, request }) => {
    await MockDelayManager.random('normal');

    const { formId } = params;
    const formIndex = formsStore.findIndex(f => f.id === formId);

    if (formIndex === -1) {
      return MockResponseManager.error('FORM_NOT_FOUND');
    }

    const form = formsStore[formIndex];
    if (form.status !== 'DRAFT') {
      return MockResponseManager.error('FORM_NOT_DRAFT');
    }

    const body = (await request.json()) as Partial<FormFixture>;

    const updatedForm: FormFixture = {
      ...form,
      ...body,
      id: form.id, // prevent id override
      status: form.status, // prevent status override via PATCH
      updatedAt: new Date().toISOString(),
    };

    formsStore[formIndex] = updatedForm;

    return MockResponseManager.success(updatedForm);
  }),

  /**
   * DELETE /api/v1/forms/:formId - 공고 삭제
   * 에러 케이스: 404 FORM_NOT_FOUND, 403 FORBIDDEN (1/50)
   */
  http.delete(`${API_PREFIX}/forms/:formId`, async ({ params }) => {
    await MockDelayManager.random('fast');

    const { formId } = params;
    const formIndex = formsStore.findIndex(f => f.id === formId);

    // Check existence first
    if (formIndex === -1) {
      return MockResponseManager.error('FORM_NOT_FOUND');
    }

    // Random error only for existing forms
    const randomError = MockErrorSimulator.maybeError('FORBIDDEN');
    if (randomError) return randomError;

    formsStore.splice(formIndex, 1);

    return MockResponseManager.success({ deleted: true });
  }),

  /**
   * POST /api/v1/forms/:formId/publish - 공고 게시
   * 에러 케이스: 404 FORM_NOT_FOUND, 422 FORM_INCOMPLETE
   */
  http.post(`${API_PREFIX}/forms/:formId/publish`, async ({ params }) => {
    await MockDelayManager.random('normal');

    const { formId } = params;
    const form = formsStore.find(f => f.id === formId);

    if (!form) {
      return MockResponseManager.error('FORM_NOT_FOUND');
    }

    if (form.status !== 'DRAFT') {
      return MockResponseManager.error('FORM_NOT_DRAFT');
    }

    // Simulate incomplete form check (random 1/50)
    const randomError = MockErrorSimulator.maybeError('FORM_INCOMPLETE');
    if (randomError) return randomError;

    // Determine status based on start date
    const now = new Date();
    const startDate = form.startDate ? new Date(form.startDate) : now;

    form.status = startDate > now ? 'SCHEDULED' : 'ACTIVE';
    form.updatedAt = new Date().toISOString();

    return MockResponseManager.success(form);
  }),

  /**
   * POST /api/v1/forms/:formId/close - 공고 조기 종료
   * 에러 케이스: 404 FORM_NOT_FOUND, 409 FORM_NOT_ACTIVE
   */
  http.post(`${API_PREFIX}/forms/:formId/close`, async ({ params }) => {
    await MockDelayManager.random('normal');

    const { formId } = params;
    const form = formsStore.find(f => f.id === formId);

    if (!form) {
      return MockResponseManager.error('FORM_NOT_FOUND');
    }

    if (form.status !== 'ACTIVE') {
      return MockResponseManager.error('FORM_NOT_ACTIVE');
    }

    form.status = 'CLOSED';
    form.endDate = new Date().toISOString();
    form.updatedAt = new Date().toISOString();

    return MockResponseManager.success(form);
  }),
];
