import { http } from 'msw';

import { EnvManager } from '@/shared/lib';

import { type QuestionFixture, formsStore, questionsStore } from '../fixtures';
import { MockDelayManager, MockErrorSimulator, MockResponseManager } from '../utils';

const BASE_URL = EnvManager.getAppEnv('VITE_API_BASE_URL') || '';
const API_PREFIX = `${BASE_URL}/api/v1`;

/**
 * Check if form is in editable state (DRAFT only)
 */
function isFormEditable(formId: string): boolean {
  const form = formsStore.find(f => f.id === formId);
  return form?.status === 'DRAFT';
}

export const questionsHandlers = [
  /**
   * GET /api/v1/forms/:formId/questions - 공고의 질문 목록 조회
   * 에러 케이스: 404 FORM_NOT_FOUND
   */
  http.get(`${API_PREFIX}/forms/:formId/questions`, async ({ params }) => {
    await MockDelayManager.random('fast');

    const { formId } = params;
    const form = formsStore.find(f => f.id === formId);

    if (!form) {
      return MockResponseManager.error('FORM_NOT_FOUND');
    }

    const questions = questionsStore
      .filter(q => q.formId === formId)
      .sort((a, b) => a.order - b.order);

    return MockResponseManager.success(questions);
  }),

  /**
   * POST /api/v1/forms/:formId/questions - 질문 생성
   * 에러 케이스: 404 FORM_NOT_FOUND, 409 QUESTION_LOCKED
   */
  http.post(`${API_PREFIX}/forms/:formId/questions`, async ({ params, request }) => {
    await MockDelayManager.random('normal');

    const { formId } = params;
    const form = formsStore.find(f => f.id === formId);

    if (!form) {
      return MockResponseManager.error('FORM_NOT_FOUND');
    }

    if (!isFormEditable(formId as string)) {
      return MockResponseManager.error('QUESTION_LOCKED');
    }

    const body = (await request.json()) as Partial<QuestionFixture>;

    // Get max order for this form
    const formQuestions = questionsStore.filter(q => q.formId === formId);
    const maxOrder = formQuestions.length > 0
      ? Math.max(...formQuestions.map(q => q.order))
      : 0;

    const newQuestion: QuestionFixture = {
      id: `q-${Date.now()}`,
      formId: formId as string,
      title: body.title ?? '제목 없음',
      type: body.type ?? 'SHORT_TEXT',
      required: body.required ?? false,
      order: maxOrder + 1,
      options: body.options,
      maxLength: body.maxLength,
      allowedFileTypes: body.allowedFileTypes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    questionsStore.push(newQuestion);

    return MockResponseManager.success(newQuestion, { status: 201 });
  }),

  /**
   * PATCH /api/v1/questions/:questionId - 질문 수정
   * 에러 케이스: 404 QUESTION_NOT_FOUND, 409 QUESTION_LOCKED
   */
  http.patch(`${API_PREFIX}/questions/:questionId`, async ({ params, request }) => {
    await MockDelayManager.random('normal');

    const { questionId } = params;
    const questionIndex = questionsStore.findIndex(q => q.id === questionId);

    if (questionIndex === -1) {
      return MockResponseManager.error('QUESTION_NOT_FOUND');
    }

    const question = questionsStore[questionIndex];

    if (!isFormEditable(question.formId)) {
      return MockResponseManager.error('QUESTION_LOCKED');
    }

    const body = (await request.json()) as Partial<QuestionFixture>;

    const updatedQuestion: QuestionFixture = {
      ...question,
      ...body,
      id: question.id, // prevent id override
      formId: question.formId, // prevent formId override
      updatedAt: new Date().toISOString(),
    };

    questionsStore[questionIndex] = updatedQuestion;

    return MockResponseManager.success(updatedQuestion);
  }),

  /**
   * DELETE /api/v1/questions/:questionId - 질문 삭제
   * 에러 케이스: 404 QUESTION_NOT_FOUND, 409 QUESTION_LOCKED
   */
  http.delete(`${API_PREFIX}/questions/:questionId`, async ({ params }) => {
    await MockDelayManager.random('fast');

    const { questionId } = params;
    const questionIndex = questionsStore.findIndex(q => q.id === questionId);

    if (questionIndex === -1) {
      return MockResponseManager.error('QUESTION_NOT_FOUND');
    }

    const question = questionsStore[questionIndex];

    if (!isFormEditable(question.formId)) {
      return MockResponseManager.error('QUESTION_LOCKED');
    }

    questionsStore.splice(questionIndex, 1);

    return MockResponseManager.success({ deleted: true });
  }),

  /**
   * PATCH /api/v1/forms/:formId/questions/reorder - 질문 순서 변경
   * 에러 케이스: 404 FORM_NOT_FOUND, 409 QUESTION_LOCKED, 400 VALIDATION_ERROR
   */
  http.patch(`${API_PREFIX}/forms/:formId/questions/reorder`, async ({ params, request }) => {
    await MockDelayManager.random('normal');

    const { formId } = params;
    const form = formsStore.find(f => f.id === formId);

    if (!form) {
      return MockResponseManager.error('FORM_NOT_FOUND');
    }

    if (!isFormEditable(formId as string)) {
      return MockResponseManager.error('QUESTION_LOCKED');
    }

    const body = (await request.json()) as { questionIds: string[] };

    // Random validation error
    const randomError = MockErrorSimulator.maybeError('VALIDATION_ERROR');
    if (randomError) return randomError;

    // Update order based on questionIds array order
    body.questionIds.forEach((qId, index) => {
      const question = questionsStore.find(q => q.id === qId && q.formId === formId);
      if (question) {
        question.order = index + 1;
        question.updatedAt = new Date().toISOString();
      }
    });

    const reorderedQuestions = questionsStore
      .filter(q => q.formId === formId)
      .sort((a, b) => a.order - b.order);

    return MockResponseManager.success(reorderedQuestions);
  }),
];
