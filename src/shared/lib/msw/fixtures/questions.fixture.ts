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
  description: string | null;
  type: QuestionType;
  required: boolean;
  order: number;
  options?: string[];
  maxLength?: number;
  maxScore: number;
  weight: number;
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
    description: '본인의 배경과 경험을 자유롭게 작성해주세요.',
    type: 'LONG_TEXT',
    required: true,
    order: 1,
    maxLength: 1000,
    maxScore: 100,
    weight: 1.0,
    createdAt: '2026-01-10T10:00:00Z',
    updatedAt: '2026-01-10T10:00:00Z',
  },
  {
    id: 'q-2',
    formId: 'form-1',
    title: '지원 동기',
    description: null,
    type: 'LONG_TEXT',
    required: true,
    order: 2,
    maxLength: 1000,
    maxScore: 100,
    weight: 1.5,
    createdAt: '2026-01-10T10:00:00Z',
    updatedAt: '2026-01-10T10:00:00Z',
  },
  {
    id: 'q-3',
    formId: 'form-1',
    title: '개발 경력',
    description: null,
    type: 'SINGLE_CHOICE',
    required: true,
    order: 3,
    options: ['신입', '1-3년', '3-5년', '5년 이상'],
    maxScore: 100,
    weight: 1.0,
    createdAt: '2026-01-10T10:00:00Z',
    updatedAt: '2026-01-10T10:00:00Z',
  },
  // form-2 questions
  {
    id: 'q-4',
    formId: 'form-2',
    title: '포트폴리오 링크',
    description: '포트폴리오 또는 작업물을 확인할 수 있는 링크를 입력해주세요.',
    type: 'SHORT_TEXT',
    required: true,
    order: 1,
    maxLength: 100,
    maxScore: 100,
    weight: 2.0,
    createdAt: '2025-12-20T09:00:00Z',
    updatedAt: '2025-12-20T09:00:00Z',
  },
  {
    id: 'q-5',
    formId: 'form-2',
    title: '디자인 툴 경험',
    description: null,
    type: 'MULTIPLE_CHOICE',
    required: true,
    order: 2,
    options: ['Figma', 'Sketch', 'Adobe XD', 'Photoshop', 'Illustrator'],
    maxScore: 100,
    weight: 1.0,
    createdAt: '2025-12-20T09:00:00Z',
    updatedAt: '2025-12-20T09:00:00Z',
  },
  // form-3 questions (draft)
  {
    id: 'q-6',
    formId: 'form-3',
    title: '이름',
    description: null,
    type: 'SHORT_TEXT',
    required: true,
    order: 1,
    maxLength: 100,
    maxScore: 100,
    weight: 1.0,
    createdAt: '2026-02-25T14:00:00Z',
    updatedAt: '2026-02-25T14:00:00Z',
  },
];

/**
 * In-memory store for mutation
 */
export const questionsStore = structuredClone(questionsFixture);

/**
 * Reset store to initial state
 */
export function resetQuestionsStore(): void {
  questionsStore.length = 0;
  questionsStore.push(...structuredClone(questionsFixture));
}
