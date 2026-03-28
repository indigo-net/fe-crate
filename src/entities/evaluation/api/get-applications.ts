import AxiosManager from '@/shared/lib/axios-manager';
import CustomSearchParams from '@/shared/lib/custom-search-params';

interface GetApplicationsParams {
  page?: number;
  limit?: number;
}

interface GetApplicationsResponse {
  id: string;
  formId: string;
  applicantName: string;
  applicantEmail: string;
  status: 'SUBMITTED' | 'UNDER_REVIEW' | 'EVALUATED';
  submittedAt: string;
  createdAt: string;
  updatedAt: string;
}

async function getApplications(
  formId: string,
  params?: GetApplicationsParams,
): Promise<GetApplicationsResponse[]> {
  const axios = AxiosManager.getAxiosInstance();
  const url = CustomSearchParams.buildURL(`/api/v1/forms/${formId}/applications`, params ?? {});
  const response = await axios.get<GetApplicationsResponse[]>(url);
  return response.data;
}

export { getApplications };
export type { GetApplicationsParams, GetApplicationsResponse };
