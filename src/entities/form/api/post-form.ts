import AxiosManager from '@/shared/lib/axios-manager';

import type { FormStatusType, SelectionMethodType } from '../types';

interface QuestionRequestData {
  type: 'SHORT_TEXT' | 'LONG_TEXT' | 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE';
  title: string;
  description: string | null;
  required: boolean;
  order: number;
  options: string[] | null;
}

interface PostFormRequestData {
  title: string;
  description: string | null;
  status: FormStatusType;
  selectionMethod: SelectionMethodType;
  startDate: string | null;
  endDate: string | null;
  targetCount: number | null;
  standbyCount: number | null;
  questions: QuestionRequestData[];
}

interface CreatedQuestionResponse {
  id: string;
  formId: string;
  type: 'SHORT_TEXT' | 'LONG_TEXT' | 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE';
  title: string;
  description: string | null;
  required: boolean;
  order: number;
  options: string[] | null;
  createdAt: string;
  updatedAt: string;
}

interface PostFormResponse {
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
  questions: CreatedQuestionResponse[];
  createdAt: string;
  updatedAt: string;
}

async function postForm(data: PostFormRequestData): Promise<PostFormResponse> {
  const axios = AxiosManager.getAxiosInstance();
  const response = await axios.post<PostFormResponse>('/api/v1/forms', data);
  return response.data;
}

export { postForm };
export type { PostFormRequestData, PostFormResponse, QuestionRequestData, CreatedQuestionResponse };
