import { createContext, useMemo } from 'react';

import type { ReactNode } from 'react';

interface AuthContextValue {
  isLoggined: boolean; // 임시: 항상 true
}

const AuthContext = createContext<AuthContextValue | null>(null);

interface Props {
  children: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const value = useMemo(() => ({ isLoggined: true }), []);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
