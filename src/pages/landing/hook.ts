import { useState } from 'react';

const useLandingPageController = () => {
  const [isLoggined] = useState(() => {
    const loginFlag = localStorage?.getItem('isLoggined');
    return loginFlag === 'true';
  });

  return {
    isLoggined,
  };
};

export default useLandingPageController;
