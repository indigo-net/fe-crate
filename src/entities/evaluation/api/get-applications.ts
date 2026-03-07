import AxiosManager from '@/shared/lib/axios-manager';

interface GetApplicationsParams {
  page?: number;
  limit?: number;
}

interface ApplicationListItem {
  id: string;
  formId: string;
  applicantName: string;
  applicantEmail: string;
  status: 'SUBMITTED' | 'UNDER_REVIEW' | 'EVALUATED';
  submittedAt: string;
  createdAt: string;
  updatedAt: string;
}

interface GetApplicationsResponse {
  data: ApplicationListItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

async function getApplications(
  formId: string,
  params?: GetApplicationsParams,
): Promise<GetApplicationsResponse> {
  const axios = AxiosManager.getAxiosInstance();
  const response = await axios.get<GetApplicationsResponse>(
    `/api/v1/forms/${formId}/applications`,
    { params },
  );
  return response.data;
}

export { getApplications };
export type { GetApplicationsParams, GetApplicationsResponse, ApplicationListItem };
