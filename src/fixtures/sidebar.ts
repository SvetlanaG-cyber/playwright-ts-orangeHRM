import { test as base } from '@playwright/test';
import { env } from '../config/env';
import { LoginPage } from '../pages/login/LoginPage';
import { Sidebar } from '../components/layout/Sidebar';

/**
 * Фикстура: логин + готовый Sidebar. В тестах используй { sidebar } — не создавай new Sidebar(page).
 */
export const test = base.extend<{ sidebar: Sidebar }>({
  sidebar: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(env.username, env.password);
    const sidebar = new Sidebar(page);
    await use(sidebar);
  },
});

export { expect } from '@playwright/test';
