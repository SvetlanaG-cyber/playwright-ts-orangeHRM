import { Page, Locator } from '@playwright/test';

/**
 * Левое меню приложения (Admin, PIM, Leave…).
 * Переиспользуемый метод навигации: goToSection(name).
 */
export class Sidebar {
  constructor(private readonly page: Page) {}

  get container(): Locator {
    return this.page.getByRole('navigation').first();
  }

  getSection(name: string): Locator {
    return this.container
      .getByRole('link', { name: new RegExp(name, 'i') })
      .or(this.container.getByRole('button', { name: new RegExp(name, 'i') }));
  }

  /**
   * Клик по пункту меню. Переиспользуй в тестах для навигации: await sidebar.goToSection('PIM');
   * Ожидание перехода — в тесте (toHaveURL / waitForSelector).
   */
  async goToSection(name: string): Promise<void> {
    await this.getSection(name).click();
  }
}
