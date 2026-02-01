/**
 * Типы для конфигурации тестов (логин, пороги, границы).
 */
export interface TestConfig {
  readonly LOGIN_URL: string;
  readonly INVALID_USERNAME: string;
  readonly INVALID_PASSWORD: string;
  readonly MAX_PAGE_LOAD_TIME: number;
  readonly MAX_LOGIN_RESPONSE_TIME: number;
  readonly MAX_LENGTH: number;
}
