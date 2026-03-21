type EvaluationStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

// 신규: 제네릭 평가 상태 (EvaluationModel<T>에서 사용)
interface EvaluationState<T> {
  id: string;
  target: T;
  score: number;
  weight: number;
  comment?: string;
}

// 레거시: 기존 코드 호환용 (Step 4에서 제거 예정)
interface QuestionScore {
  questionId: string;
  score: number;
  weight: number;
  comment?: string;
}

interface LegacyEvaluationState {
  id: string;
  applicationId: string;
  evaluatorId: string;
  formId: string;
  status: EvaluationStatus;
  scores: QuestionScore[];
  totalScore: number;
  overallComment?: string;
}

export type { EvaluationStatus, EvaluationState, QuestionScore, LegacyEvaluationState };
