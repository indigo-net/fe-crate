import AxiosManager from '@/shared/lib/axios-manager';

interface QuestionOption {
  id: string;
  content: string;
}

type QuestionType = 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'SHORT_TEXT' | 'LONG_TEXT';

interface FormQuestion {
  id: string;
  formId: string;
  title: string;
  description?: string;
  type: QuestionType;
  required: boolean;
  order: number;
  options?: string[];
  maxLength?: number;
  createdAt: string;
  updatedAt: string;
}

async function getFormQuestions(formId: string): Promise<FormQuestion[]> {
  const axios = AxiosManager.getAxiosInstance();
  const response = await axios.get<FormQuestion[]>(
    `/api/v1/forms/${formId}/questions`,
  );
  return response.data;
}

export { getFormQuestions };
export type { FormQuestion, QuestionType, QuestionOption };
