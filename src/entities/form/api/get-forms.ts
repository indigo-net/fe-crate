import AxiosManager from '@/shared/lib/axios-manager';
import CustomSearchParams from '@/shared/lib/custom-search-params';

import type { FormStatusType, SelectionMethodType } from '@/entities/form';

interface GetFormsParams {
  userId?: string;
  filter?: 'creator' | 'evaluator';
  status?: FormStatusType;
}

interface GetFormsResponse {
  id: string;
  title: string;
  description: string | null;
  status: FormStatusType;
  selectionMethod: SelectionMethodType;
  startDate: string | null;
  endDate: string | null;
  targetCount: number | null;
  standbyCount: number | null;
  questionIds: string[];
  authorEmail: string;
  evaluatorIds: string[];
  createdAt: string;
  updatedAt: string;
}

async function getForms(params?: GetFormsParams): Promise<GetFormsResponse[]> {
  const axios = AxiosManager.getAxiosInstance();
  const url = CustomSearchParams.buildURL('/api/v1/forms', params ?? {});
  const response = await axios.get<GetFormsResponse[]>(url);
  return response.data;
}

export { getForms };
export type { GetFormsParams, GetFormsResponse };
