/**
 * Evaluation Fixture Data
 * Mock 데이터: 평가
 */

export type EvaluationStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

export interface QuestionScore {
  questionId: string;
  score: number;
  maxScore: number;
  weight: number;
  comment?: string;
}

export interface EvaluationFixture {
  id: string;
  applicationId: string;
  evaluatorId: string;
  formId: string;
  status: EvaluationStatus;
  scores: QuestionScore[];
  totalScore: number | null;
  overallComment?: string;
  createdAt: string;
  updatedAt: string;
}

export const evaluationsFixture: EvaluationFixture[] = [
  // form-2 evaluations (closed form)
  {
    id: 'eval-1',
    applicationId: 'app-2',
    evaluatorId: 'evaluator-1',
    formId: 'form-2',
    status: 'COMPLETED',
    scores: [
      { questionId: 'q-4', score: 8, maxScore: 10, weight: 2.0, comment: '포트폴리오 구성이 좋음' },
      { questionId: 'q-5', score: 9, maxScore: 10, weight: 1.0, comment: '다양한 툴 경험 보유' },
    ],
    totalScore: 85,
    overallComment: '채용 추천',
    createdAt: '2026-02-03T10:00:00Z',
    updatedAt: '2026-02-05T16:00:00Z',
  },
  {
    id: 'eval-2',
    applicationId: 'app-3',
    evaluatorId: 'evaluator-1',
    formId: 'form-2',
    status: 'IN_PROGRESS',
    scores: [
      { questionId: 'q-4', score: 7, maxScore: 10, weight: 2.0 },
    ],
    totalScore: null,
    createdAt: '2026-02-03T10:00:00Z',
    updatedAt: '2026-02-03T11:00:00Z',
  },
  {
    id: 'eval-3',
    applicationId: 'app-1',
    evaluatorId: 'evaluator-2',
    formId: 'form-2',
    status: 'PENDING',
    scores: [],
    totalScore: null,
    createdAt: '2026-02-03T10:00:00Z',
    updatedAt: '2026-02-03T10:00:00Z',
  },
];

/**
 * In-memory store for mutation
 */
export const evaluationsStore = structuredClone(evaluationsFixture);

/**
 * Reset store to initial state
 */
export function resetEvaluationsStore(): void {
  evaluationsStore.length = 0;
  evaluationsStore.push(...structuredClone(evaluationsFixture));
}
