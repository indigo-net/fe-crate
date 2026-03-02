/**
 * Evaluator Fixture Data
 * Mock 데이터: 평가자
 */

export type EvaluatorRole = 'ADMIN' | 'EVALUATOR';

export interface EvaluatorFixture {
  id: string;
  formId: string;
  name: string;
  email: string;
  role: EvaluatorRole;
  assignedApplicationIds: string[];
  assignedQuestionIds: string[];
  createdAt: string;
  updatedAt: string;
}

export const evaluatorsFixture: EvaluatorFixture[] = [
  // form-2 evaluators
  {
    id: 'evaluator-1',
    formId: 'form-2',
    name: '홍평가',
    email: 'hong.eval@company.com',
    role: 'EVALUATOR',
    assignedApplicationIds: ['app-2', 'app-3'],
    assignedQuestionIds: ['q-4', 'q-5'],
    createdAt: '2026-01-25T09:00:00Z',
    updatedAt: '2026-02-01T10:00:00Z',
  },
  {
    id: 'evaluator-2',
    formId: 'form-2',
    name: '김관리',
    email: 'kim.admin@company.com',
    role: 'ADMIN',
    assignedApplicationIds: ['app-1'],
    assignedQuestionIds: ['q-4', 'q-5'],
    createdAt: '2026-01-20T09:00:00Z',
    updatedAt: '2026-02-01T10:00:00Z',
  },
  // form-1 evaluator (active form - no evaluations yet)
  {
    id: 'evaluator-3',
    formId: 'form-1',
    name: '이심사',
    email: 'lee.review@company.com',
    role: 'EVALUATOR',
    assignedApplicationIds: [],
    assignedQuestionIds: [],
    createdAt: '2026-02-10T14:00:00Z',
    updatedAt: '2026-02-10T14:00:00Z',
  },
];

/**
 * In-memory store for mutation
 */
export const evaluatorsStore = [...evaluatorsFixture];

/**
 * Reset store to initial state
 */
export function resetEvaluatorsStore(): void {
  evaluatorsStore.length = 0;
  evaluatorsStore.push(...evaluatorsFixture);
}
