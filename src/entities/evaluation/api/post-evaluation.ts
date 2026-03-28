import AxiosManager from '@/shared/lib/axios-manager';

import type { ServerEvaluationStatus } from '../types';

interface QuestionScoreResponse {
  questionId: string;
  score: number;
  weight: number;
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
  status: ServerEvaluationStatus;
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
