import AxiosManager from '@/shared/lib/axios-manager';

import type { EvaluationStatus } from '@/entities/evaluation';

interface QuestionScoreResponse {
  questionId: string;
  score: number;
  weight: number;
  comment?: string;
}

interface GetApplicationEvaluationsResponse {
  id: string;
  applicationId: string;
  evaluatorId: string;
  formId: string;
  status: EvaluationStatus;
  scores: QuestionScoreResponse[];
  totalScore: number;
  overallComment?: string;
}

async function getApplicationEvaluations(
  applicationId: string,
): Promise<GetApplicationEvaluationsResponse[]> {
  const axios = AxiosManager.getAxiosInstance();
  const response = await axios.get<GetApplicationEvaluationsResponse[]>(
    `/api/v1/applications/${applicationId}/evaluations`,
  );
  return response.data;
}

export { getApplicationEvaluations };
export type { GetApplicationEvaluationsResponse, QuestionScoreResponse };
