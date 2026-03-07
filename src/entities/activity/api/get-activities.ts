import AxiosManager from '@/shared/lib/axios-manager';
import CustomSearchParams from '@/shared/lib/custom-search-params';

import type { ActivityType } from '../types';

interface GetActivitiesParams {
  limit?: number;
}

interface GetActivitiesResponse {
  id: string;
  user: string;
  action: string;
  target: string;
  type: ActivityType;
  createdAt: string;
}

async function getActivities(params?: GetActivitiesParams): Promise<GetActivitiesResponse[]> {
  const axios = AxiosManager.getAxiosInstance();
  const url = CustomSearchParams.buildURL('/api/v1/activities', params ?? {});
  const response = await axios.get<GetActivitiesResponse[]>(url);
  return response.data;
}

export { getActivities };
export type { GetActivitiesParams, GetActivitiesResponse };
