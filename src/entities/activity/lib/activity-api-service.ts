import CachedService from '@/entities/cache/lib/cached-service';

import { getActivities } from '../api/get-activities';

import type { GetActivitiesResponse } from '../api/get-activities';

class ActivityApiService {
  private static CACHE_KEY = 'activity-list';
  private static CACHE_TTL_MS = 2 * 60 * 1000;

  static async fetchRecentActivities(limit?: number): Promise<GetActivitiesResponse[]> {
    const cacheKey = `${this.CACHE_KEY}:${limit ?? 'default'}`;
    const cached = CachedService.get<GetActivitiesResponse[]>(cacheKey);
    if (cached) {
      return cached;
    }

    const response = await getActivities(limit ? { limit } : undefined);
    CachedService.set(cacheKey, response, this.CACHE_TTL_MS);
    return response;
  }
}

export { ActivityApiService };
