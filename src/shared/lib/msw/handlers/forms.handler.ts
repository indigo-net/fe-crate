import { http } from 'msw';

import { EnvManager } from '@/shared/lib';

import { type FormFixture, formsStore } from '../fixtures/forms.fixture';
import { MockDelayManager, MockErrorSimulator, MockResponseManager } from '../utils';

const BASE_URL = EnvManager.getAppEnv('VITE_API_BASE_URL') || '';
const API_PREFIX = `${BASE_URL}/api/v1`;

// 백엔드 API 타입 정의
type FormStatus = 'DRAFT' | 'SCHEDULED' | 'PUBLISHED' | 'CLOSED';
type SelectionMethod = 'QUANTITATIVE' | 'LOTTERY' | 'FIRST_COME_FIRST_SERVED';

interface QuestionInput {
  type: 'SHORT_TEXT' | 'LONG_TEXT' | 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE';
  title: string;
  description: string | null;
  required: boolean;
  order: number;
  options: string[] | null;
  maxScore?: number;
  weight?: number;
}

interface CreatedQuestion {
  id: string;
  formId: string;
  type: 'SHORT_TEXT' | 'LONG_TEXT' | 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE';
  title: string;
  description: string | null;
  required: boolean;
  order: number;
  options: string[] | null;
  maxScore: number;
  weight: number;
  createdAt: string;
  updatedAt: string;
}

interface CreateFormRequest {
  title: string;
  description: string | null;
  status: FormStatus;
  selectionMethod: SelectionMethod;
  startDate: string | null;
  endDate: string | null;
  targetCount: number | null;
  standbyCount: number | null;
  questions: QuestionInput[];
}

interface CreateFormResponse extends FormFixture {
  questions: CreatedQuestion[];
}

// 질문 저장소 (핸들러 내부)
const createdQuestionsStore: CreatedQuestion[] = [];

export const formsHandlers = [
  /**
   * GET /api/v1/forms - 공고 목록 조회
   * Query Parameters:
   *   - userId: string (optional) - 사용자 이메일로 필터링
   *   - filter: 'creator' | 'evaluator' (optional, default: 'creator')
   *   - status: FormStatus (optional) - 상태 필터
   * 에러 케이스: 503 SERVICE_UNAVAILABLE (1/50)
   */
  http.get(`${API_PREFIX}/forms`, async ({ request }) => {
    await MockDelayManager.random('normal');

    const randomError = MockErrorSimulator.maybeError('SERVICE_UNAVAILABLE');
    if (randomError) {
      return randomError;
    }

    // 쿼리 파라미터 파싱
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId') || undefined;
    const filter = (url.searchParams.get('filter') as 'creator' | 'evaluator') || 'creator';
    const status = url.searchParams.get('status') as FormStatus | null;

    // 필터링
    let filteredForms = formsStore;

    if (userId) {
      if (filter === 'creator') {
        filteredForms = filteredForms.filter(f => f.authorEmail === userId);
      } else if (filter === 'evaluator') {
        filteredForms = filteredForms.filter(f => f.evaluatorIds.includes(userId));
      }
    }

    if (status) {
      filteredForms = filteredForms.filter(f => f.status === status);
    }

    // 응답 데이터 변환
    const forms = filteredForms.map(form => ({
      id: form.id,
      title: form.title,
      description: form.description,
      status: form.status,
      selectionMethod: form.selectionMethod,
      startDate: form.startDate,
      endDate: form.endDate,
      targetCount: form.targetCount,
      standbyCount: form.standbyCount,
      questionIds: form.questionIds,
      authorEmail: form.authorEmail,
      evaluatorIds: form.evaluatorIds,
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
   * POST /api/v1/forms - 공고 생성 (질문 포함)
   * 에러 케이스: 400 VALIDATION_ERROR (1/50)
   */
  http.post(`${API_PREFIX}/forms`, async ({ request }) => {
    await MockDelayManager.random('normal');

    const randomError = MockErrorSimulator.maybeError('VALIDATION_ERROR');
    if (randomError) {
      return randomError;
    }

    const body = (await request.json()) as CreateFormRequest;
    const now = new Date().toISOString();
    const formId = `form-${Date.now()}`;

    // 폼 생성
    const newForm: FormFixture = {
      id: formId,
      title: body.title ?? '제목 없음',
      description: body.description ?? null,
      status: body.status ?? 'DRAFT',
      selectionMethod: body.selectionMethod ?? 'QUANTITATIVE',
      startDate: body.startDate ?? null,
      endDate: body.endDate ?? null,
      targetCount: body.targetCount ?? null,
      standbyCount: body.standbyCount ?? null,
      questionIds: [],
      authorEmail: 'admin@crate.io', // TODO: 실제 사용자 이메일로 변경
      evaluatorIds: [],
      createdAt: now,
      updatedAt: now,
    };

    // 질문 생성
    const createdQuestions: CreatedQuestion[] = body.questions.map((question, index) => {
      const questionId = `q-${Date.now()}-${index}`;
      const createdQuestion: CreatedQuestion = {
        id: questionId,
        formId,
        type: question.type,
        title: question.title,
        description: question.description ?? null,
        required: question.required ?? false,
        order: question.order ?? index + 1,
        options: question.options ?? null,
        maxScore: question.maxScore ?? 100,
        weight: question.weight ?? 1.0,
        createdAt: now,
        updatedAt: now,
      };
      createdQuestionsStore.push(createdQuestion);
      return createdQuestion;
    });

    // 폼에 질문 ID 연결
    newForm.questionIds = createdQuestions.map(q => q.id);
    formsStore.push(newForm);

    const response: CreateFormResponse = {
      ...newForm,
      questions: createdQuestions,
    };
    return MockResponseManager.success(response, { status: 201 });
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
      id: form.id,
      status: form.status,
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

    if (formIndex === -1) {
      return MockResponseManager.error('FORM_NOT_FOUND');
    }
    const randomError = MockErrorSimulator.maybeError('FORBIDDEN');
    if (randomError) {
      return randomError;
    }

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
    const randomError = MockErrorSimulator.maybeError('FORM_INCOMPLETE');
    if (randomError) {
      return randomError;
    }

    const now = new Date();
    const startDate = form.startDate ? new Date(form.startDate) : now;
    form.status = startDate > now ? 'SCHEDULED' : 'PUBLISHED';
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
    if (form.status !== 'PUBLISHED') {
      return MockResponseManager.error('FORM_NOT_ACTIVE');
    }
    form.status = 'CLOSED';
    form.endDate = new Date().toISOString();
    form.updatedAt = new Date().toISOString();
    return MockResponseManager.success(form);
  }),
];
