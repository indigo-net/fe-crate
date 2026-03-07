import AxiosManager from '@/shared/lib/axios-manager';

interface ApplicationAnswer {
  questionId: string;
  value: string | string[] | null;
}

interface GetApplicationResponse {
  id: string;
  formId: string;
  applicantName: string;
  applicantEmail: string;
  status: 'SUBMITTED' | 'UNDER_REVIEW' | 'EVALUATED';
  answers: ApplicationAnswer[];
  submittedAt: string;
  createdAt: string;
  updatedAt: string;
}

async function getApplication(applicationId: string): Promise<GetApplicationResponse> {
  const axios = AxiosManager.getAxiosInstance();
  const response = await axios.get<GetApplicationResponse>(
    `/api/v1/applications/${applicationId}`,
  );
  return response.data;
}

export { getApplication };
export type { GetApplicationResponse, ApplicationAnswer };
