import AxiosManager from '@/shared/lib/axios-manager';

type GetEvaluatorAssignedFormsResponse = {
  formId: string;
  title: string;
  totalApplications: number;
  completedEvaluations: number;
}[];

async function getEvaluatorAssignedForms(): Promise<GetEvaluatorAssignedFormsResponse> {
  const axios = AxiosManager.getAxiosInstance();
  const response = await axios.get<GetEvaluatorAssignedFormsResponse>(
    '/api/v1/evaluators/me/forms',
  );
  return response.data;
}

export { getEvaluatorAssignedForms };
