import AxiosManager from '@/shared/lib/axios-manager';

import type { EvaluationStatus } from '@/entities/evaluation';

interface QuestionScoreResponse {
  questionId: string;
  score: number;
  comment?: string;
}

interface PostEvaluationRequestData {
  applicationId: string;
  formId: string;
}

interface PostEvaluationResponse {
  id: string;
  applicationId: string;
  evaluatorId: string;
  formId: string;
  status: EvaluationStatus;
  scores: QuestionScoreResponse[];
  totalScore: number;
  overallComment?: string;
}

async function postEvaluation(data: PostEvaluationRequestData): Promise<PostEvaluationResponse> {
  const axios = AxiosManager.getAxiosInstance();
  const response = await axios.post<PostEvaluationResponse>('/api/v1/evaluations', data);
  return response.data;
}

export { postEvaluation };
export type { PostEvaluationRequestData, PostEvaluationResponse };
