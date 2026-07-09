export type ClientEnv = {
  AUTH_TOKEN?: string;
  API_BASE_URL?: string;
};

export type AppConfig = {
  authToken: string;
  apiBaseUrl: string;
};

const defaultApiBaseUrl = 'http://localhost:3000/api/v1';

export const createAppConfig = (env: ClientEnv): AppConfig => {
  const authToken = env.AUTH_TOKEN;

  if (!authToken) {
    throw new Error('AUTH_TOKEN is required.');
  }

  return {
    authToken,
    apiBaseUrl: env.API_BASE_URL || defaultApiBaseUrl,
  };
};

const getClientEnv = (): ClientEnv => {
  if (typeof __APP_ENV__ === 'undefined') {
    return {};
  }

  return __APP_ENV__;
};

export const getAppConfig = (): AppConfig => createAppConfig(getClientEnv());
