import { useCallback, useEffect, useState } from 'react';

import { ActivityApiService } from '@/entities/activity';

import type { GetActivitiesResponse } from '@/entities/activity/api/get-activities';

const useActivityFeedSectionController = () => {
  const [activities, setActivities] = useState<GetActivitiesResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initialize = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await ActivityApiService.fetchRecentActivities(10);
      setActivities(data);
    } catch (e) {
      const message = e instanceof Error ? e.message : '활동 로그 조회 실패';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return { activities, isLoading, error };
};

export default useActivityFeedSectionController;
