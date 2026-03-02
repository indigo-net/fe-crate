import { useContext } from 'react';

import { TypeGuard } from '@/shared/lib';

import { AuthContext } from './index';

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (TypeGuard.checkNull(context)) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

export { useAuthContext };
