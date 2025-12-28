class EnvManager {
  static getAppEnv(key: AppEnvKey): string | null {
    return import.meta.env[key] ?? null;
  }

  static checkDevMode(): boolean {
    return import.meta.env.DEV;
  }

  static checkProdMode(): boolean {
    return import.meta.env.PROD;
  }
}

export default EnvManager;
