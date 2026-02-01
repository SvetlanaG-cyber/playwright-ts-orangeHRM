import { Locator } from '@playwright/test';
import { BaseAppPage } from '../base/BaseAppPage';

/**
 * Страница Admin → User Management → Users.
 * section = Admin; контент страницы — заголовок, фильтры, таблица (добавляй по мере необходимости).
 */
export class AdminPage extends BaseAppPage {
  override get section() {
    return 'Admin' as const;
  }

  get heading(): Locator {
    return this.page.getByRole('heading', { name: /system users/i });
  }

  async goto(): Promise<void> {
    await this.gotoPath('/admin/viewSystemUsers');
  }
}
