import AxiosManager from '@/shared/lib/axios-manager';

import type { ServerEvaluationStatus } from '../types';

interface QuestionScoreResponse {
  questionId: string;
  score: number;
  weight: number;
  comment?: string;
}

interface PatchEvaluationRequestData {
  scores?: { questionId: string; score: number; comment?: string }[];
  status?: ServerEvaluationStatus;
  overallComment?: string;
}

interface PatchEvaluationResponse {
  id: string;
  applicationId: string;
  evaluatorId: string;
  formId: string;
  status: ServerEvaluationStatus;
  scores: QuestionScoreResponse[];
  totalScore: number;
  overallComment?: string;
}

async function patchEvaluation(
  evaluationId: string,
  data: PatchEvaluationRequestData,
): Promise<PatchEvaluationResponse> {
  const axios = AxiosManager.getAxiosInstance();
  const response = await axios.patch<PatchEvaluationResponse>(
    `/api/v1/evaluations/${evaluationId}`,
    data,
  );
  return response.data;
}

export { patchEvaluation };
export type { PatchEvaluationRequestData, PatchEvaluationResponse };
