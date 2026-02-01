// import type { TestConfig as TestConfigType } from '../types/config.types';

// /**
//  * Конфигурация тестов с типизацией.
//  * dotenv уже загружен в playwright.config.ts, просто используем process.env
//  */
// export const TestConfig: TestConfigType = {
//   LOGIN_URL: process.env.BASE_URL || 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login',
//   INVALID_USERNAME: process.env.ORANGEHRM_INVALID_USERNAME || 'invalid_user',
//   INVALID_PASSWORD: process.env.ORANGEHRM_INVALID_PASSWORD || 'wrongpass',
//   MAX_PAGE_LOAD_TIME: parseInt(process.env.MAX_PAGE_LOAD_TIME || '3000', 10),
//   MAX_LOGIN_RESPONSE_TIME: parseInt(process.env.MAX_LOGIN_RESPONSE_TIME || '5000', 10),
//   MAX_LENGTH: parseInt(process.env.MAX_FIELD_LENGTH || '255', 10),
// } as const;
