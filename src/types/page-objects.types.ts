import type { Page } from '@playwright/test';
import type { SectionKey } from '../config/section-nav.config';

export interface IPageObject {
  readonly page: Page;
}

export interface IBaseAppPage extends IPageObject {
  readonly section: SectionKey;
  readonly sidebar: import('../components/layout/Sidebar').Sidebar;
  readonly sectionSubnav: import('../components/layout/SectionSubnav').SectionSubnav;
}
