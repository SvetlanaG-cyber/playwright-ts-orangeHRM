import { Page } from '@playwright/test';
import { SectionSubnav } from '../../components/layout/SectionSubnav';
import { Sidebar } from '../../components/layout/Sidebar';
import type { SectionKey } from '../../config/section-nav.config';
import type { IBaseAppPage, IPageObject } from '../../types';

/**
 * Базовая страница для всех экранов после логина (Admin, PIM и т.д.).
 * section — объявляется в наследнике; sectionSubnav и sidebar создаются здесь, не импортируются на каждой странице.
 */
export abstract class BaseAppPage implements IBaseAppPage, IPageObject {
  constructor(readonly page: Page) {}

  abstract get section(): SectionKey;

  get sidebar(): Sidebar {
    return new Sidebar(this.page);
  }

  get sectionSubnav(): SectionSubnav {
    return new SectionSubnav(this.page, this.section);
  }

  protected async gotoPath(path: string): Promise<void> {
    const baseUrl =
      process.env.ORANGEHRM_BASE_URL ||
      'https://opensource-demo.orangehrmlive.com/web/index.php';
    await this.page.goto(`${baseUrl}${path.startsWith('/') ? path : `/${path}`}`);
  }

  abstract goto(): Promise<void>;
}
