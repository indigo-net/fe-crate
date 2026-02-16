import { useState } from 'react';

const usePageLandingController = () => {
  const [isLoggined] = useState(() => {
    const loginFlag = localStorage?.getItem('isLoggined');
    return loginFlag === 'true';
  });

  return {
    isLoggined,
  };
};

export default usePageLandingController;
