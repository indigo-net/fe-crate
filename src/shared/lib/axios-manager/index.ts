import axios, { AxiosInstance, AxiosError, CreateAxiosDefaults } from 'axios';

class AxiosManager {
  private static instance: AxiosInstance | null = null;

  private static createInstance(config?: CreateAxiosDefaults): AxiosInstance {
    const defaultConfig: CreateAxiosDefaults = {
      baseURL: import.meta.env.VITE_API_BASE_URL,
      timeout: 10000,
      withCredentials: true, // httpOnly 쿠키 전송을 위해 필요
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // 기본 설정과 사용자 설정 병합
    const instance = axios.create({
      ...defaultConfig,
      ...config,
      headers: {
        ...defaultConfig.headers,
        ...config?.headers,
      },
    });

    instance.interceptors.response.use(
      response => {
        return response;
      },
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // TODO: refresh token
        }
        return Promise.reject(error);
      },
    );

    return instance;
  }

  static getAxiosInstance(config?: CreateAxiosDefaults): AxiosInstance {
    if (!this.instance) {
      this.instance = this.createInstance(config);
    }
    return this.instance;
  }
}

export default AxiosManager;
