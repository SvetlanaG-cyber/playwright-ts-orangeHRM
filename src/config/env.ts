/**
 * Env vars (BASE_URL, USERNAME, PASSWORD). Load .env in playwright.config.ts.
 */
function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Environment variable ${name} is required`);
  }
  return value;
}

export const env = {
  baseUrl: required('BASE_URL'),
  username: required('USERNAME'),
  password: required('PASSWORD'),
};