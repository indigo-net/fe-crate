/// <reference types="vite/client" />

declare global {
  type AppEnvKey = 'VITE_KAKAO_CLIENT_ID' | 'VITE_KAKAO_REDIRECT_URI' | 'VITE_API_BASE_URL';

  interface ImportMetaEnv {
    readonly [key in AppEnvKey]: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

export {};
