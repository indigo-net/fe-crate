type EvaluationStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

interface QuestionScore {
  questionId: string;
  score: number;
  weight: number;
  comment?: string;
}

interface EvaluationState {
  id: string;
  applicationId: string;
  evaluatorId: string;
  formId: string;
  status: EvaluationStatus;
  scores: QuestionScore[];
  totalScore: number;
  overallComment?: string;
}

export type { EvaluationStatus, QuestionScore, EvaluationState };
