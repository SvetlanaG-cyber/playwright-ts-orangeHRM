import { Locator } from '@playwright/test';
import { BaseAppPage } from '../base/BaseAppPage';

/**
 * Страница Admin → Job → Job Titles.
 * section = Admin; контент страницы Job Titles.
 */
export class JobTitleListPage extends BaseAppPage {
  override get section() {
    return 'Admin' as const;
  }

  get heading(): Locator {
    return this.page.getByRole('heading', { name: /job titles/i });
  }

  async goto(): Promise<void> {
    await this.gotoPath('/admin/viewJobTitleList');
  }
}
