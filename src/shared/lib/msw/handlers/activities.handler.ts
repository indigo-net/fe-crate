import { http } from 'msw';

import { EnvManager } from '@/shared/lib';

import { activitiesStore } from '../fixtures';
import { MockDelayManager, MockResponseManager } from '../utils';

const BASE_URL = EnvManager.getAppEnv('VITE_API_BASE_URL') || '';
const API_PREFIX = `${BASE_URL}/api/v1`;

export const activitiesHandlers = [
  /**
   * GET /api/v1/activities - 최근 활동 로그 조회
   * Query: limit (기본 10)
   */
  http.get(`${API_PREFIX}/activities`, async ({ request }) => {
    await MockDelayManager.random('fast');

    const url = new URL(request.url);
    const limit = Number(url.searchParams.get('limit')) || 10;

    const sorted = [...activitiesStore].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
    const data = sorted.slice(0, limit);

    return MockResponseManager.success(data);
  }),
];
