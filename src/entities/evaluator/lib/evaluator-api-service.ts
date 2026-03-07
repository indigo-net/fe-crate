import CacheStateService from '@/entities/cache/lib/cache-state-service';

import { getEvaluators } from '../api/get-evaluators';

import type { GetEvaluatorsResponse } from '../api/get-evaluators';

class EvaluatorApiService {
  private static CACHE_KEY = 'evaluator-dashboard-list';
  private static CACHE_TTL_MS = 5 * 60 * 1000;

  static async fetchDashboardEvaluators(): Promise<GetEvaluatorsResponse[]> {
    const cached = CacheStateService.get<GetEvaluatorsResponse[]>(this.CACHE_KEY);
    if (cached) {
      return cached;
    }

    const response = await getEvaluators();
    CacheStateService.set(this.CACHE_KEY, response, this.CACHE_TTL_MS);
    return response;
  }
}

export { EvaluatorApiService };
