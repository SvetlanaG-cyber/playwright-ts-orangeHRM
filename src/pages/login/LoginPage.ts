import { expect, Page, Locator } from '@playwright/test';
import { Sidebar } from '../../components/layout/Sidebar';
import { env } from '../../config/env';

/**
 * Страница логина OrangeHRM.
 */
export class LoginPage {
  constructor(private readonly page: Page) {}

  get usernameInput(): Locator {
    return this.page.getByPlaceholder(/username/i);
  }

  get passwordInput(): Locator {
    return this.page.getByPlaceholder(/password/i);
  }

  get submitButton(): Locator {
    return this.page.getByRole('button', { name: /login/i });
  }

  async goto(): Promise<void> {
    await this.page.goto(env.baseUrl);
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
    const sidebar = new Sidebar(this.page);
    await expect(sidebar.container).toBeVisible();
  }
}
