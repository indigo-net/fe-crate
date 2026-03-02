/**
 * Question Fixture Data
 * Mock 데이터: 질문 항목
 */

export type QuestionType =
  | 'SHORT_TEXT'
  | 'LONG_TEXT'
  | 'SINGLE_CHOICE'
  | 'MULTIPLE_CHOICE'
  | 'DATE_RANGE'
  | 'FILE_UPLOAD';

export interface QuestionFixture {
  id: string;
  formId: string;
  title: string;
  type: QuestionType;
  required: boolean;
  order: number;
  options?: string[];
  maxLength?: number;
  allowedFileTypes?: string[];
  createdAt: string;
  updatedAt: string;
}

export const questionsFixture: QuestionFixture[] = [
  // form-1 questions
  {
    id: 'q-1',
    formId: 'form-1',
    title: '자기소개를 해주세요',
    type: 'LONG_TEXT',
    required: true,
    order: 1,
    maxLength: 1000,
    createdAt: '2026-01-10T10:00:00Z',
    updatedAt: '2026-01-10T10:00:00Z',
  },
  {
    id: 'q-2',
    formId: 'form-1',
    title: '지원 동기',
    type: 'LONG_TEXT',
    required: true,
    order: 2,
    maxLength: 1000,
    createdAt: '2026-01-10T10:00:00Z',
    updatedAt: '2026-01-10T10:00:00Z',
  },
  {
    id: 'q-3',
    formId: 'form-1',
    title: '개발 경력',
    type: 'SINGLE_CHOICE',
    required: true,
    order: 3,
    options: ['신입', '1-3년', '3-5년', '5년 이상'],
    createdAt: '2026-01-10T10:00:00Z',
    updatedAt: '2026-01-10T10:00:00Z',
  },
  // form-2 questions
  {
    id: 'q-4',
    formId: 'form-2',
    title: '포트폴리오 링크',
    type: 'SHORT_TEXT',
    required: true,
    order: 1,
    maxLength: 100,
    createdAt: '2025-12-20T09:00:00Z',
    updatedAt: '2025-12-20T09:00:00Z',
  },
  {
    id: 'q-5',
    formId: 'form-2',
    title: '디자인 툴 경험',
    type: 'MULTIPLE_CHOICE',
    required: true,
    order: 2,
    options: ['Figma', 'Sketch', 'Adobe XD', 'Photoshop', 'Illustrator'],
    createdAt: '2025-12-20T09:00:00Z',
    updatedAt: '2025-12-20T09:00:00Z',
  },
  // form-3 questions (draft)
  {
    id: 'q-6',
    formId: 'form-3',
    title: '이름',
    type: 'SHORT_TEXT',
    required: true,
    order: 1,
    maxLength: 100,
    createdAt: '2026-02-25T14:00:00Z',
    updatedAt: '2026-02-25T14:00:00Z',
  },
];

/**
 * In-memory store for mutation
 */
export const questionsStore = [...questionsFixture];

/**
 * Reset store to initial state
 */
export function resetQuestionsStore(): void {
  questionsStore.length = 0;
  questionsStore.push(...questionsFixture);
}
