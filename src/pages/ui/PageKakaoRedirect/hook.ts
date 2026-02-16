import { useCallback, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { TypeGuard } from '@/shared/lib';
import { AxiosManager } from '@/shared/lib';

const usePageKakaoRedirectController = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialize = useCallback(async () => {
    const code = searchParams.get('code');

    console.log(code);

    if (!TypeGuard.checkNull(code)) {
      // TODO: 인가코드를 이용하여 access token을 발급
      try {
        await AxiosManager.getAxiosInstance().post('', { data: { code } });
        localStorage.setItem('isLoggined', 'true');
      } catch {
        localStorage.setItem('isLoggined', 'false');
      }
    } else {
      localStorage.setItem('isLoggined', 'false');
    }
    navigate('/');
  }, [searchParams, navigate]);

  useEffect(() => {
    initialize();
  }, []);
};

export default usePageKakaoRedirectController;
