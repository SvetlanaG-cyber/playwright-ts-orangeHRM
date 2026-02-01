import { Locator } from '@playwright/test';
import { BaseAppPage } from '../base/BaseAppPage';

/**
 * Страница PIM → Employee List.
 * section = PIM; контент страницы Employee List.
 */
export class EmployeeListPage extends BaseAppPage {
  override get section() {
    return 'PIM' as const;
  }

  get heading(): Locator {
    return this.page.getByRole('heading', { name: /employee list/i });
  }

  async goto(): Promise<void> {
    await this.gotoPath('/pim/viewEmployeeList');
  }
}
