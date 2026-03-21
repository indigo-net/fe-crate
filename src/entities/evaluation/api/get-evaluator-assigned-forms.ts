import AxiosManager from '@/shared/lib/axios-manager';

interface AssignedForm {
  formId: string;
  title: string;
  totalApplications: number;
  completedEvaluations: number;
}

type GetEvaluatorAssignedFormsResponse = AssignedForm[];

async function getEvaluatorAssignedForms(): Promise<GetEvaluatorAssignedFormsResponse> {
  const axios = AxiosManager.getAxiosInstance();
  const response = await axios.get<GetEvaluatorAssignedFormsResponse>(
    '/api/v1/evaluators/me/forms',
  );
  return response.data;
}

export { getEvaluatorAssignedForms };
export type { GetEvaluatorAssignedFormsResponse, AssignedForm };
