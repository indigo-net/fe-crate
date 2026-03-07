import AxiosManager from '@/shared/lib/axios-manager';

import type { EvaluationStatus } from '@/entities/evaluation';

interface QuestionScoreResponse {
  questionId: string;
  score: number;
  comment?: string;
}

interface PatchEvaluationRequestData {
  scores?: { questionId: string; score: number; comment?: string }[];
  status?: EvaluationStatus;
  overallComment?: string;
}

interface PatchEvaluationResponse {
  id: string;
  applicationId: string;
  evaluatorId: string;
  formId: string;
  status: EvaluationStatus;
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
