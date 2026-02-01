import { test, expect } from '@playwright/test';
import { env } from '../src/config/env';
import { LoginPage } from '../src/pages/login/LoginPage';

test.describe('Login', () => {
  test('after login Sidebar (sidepanel) is visible', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(env.username, env.password);
  });
});
