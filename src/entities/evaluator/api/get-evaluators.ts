import AxiosManager from '@/shared/lib/axios-manager';

import type { EvaluatorRoleType } from '../types';

interface GetEvaluatorsResponse {
  id: string;
  name: string;
  email: string;
  role: EvaluatorRoleType;
  assignedForms: Array<{
    formId: string;
    title: string;
    progress: number;
  }>;
  lastActive: string;
}

async function getEvaluators(): Promise<GetEvaluatorsResponse[]> {
  const axios = AxiosManager.getAxiosInstance();
  const response = await axios.get<GetEvaluatorsResponse[]>('/api/v1/evaluators');
  return response.data;
}

export { getEvaluators };
export type { GetEvaluatorsResponse };
