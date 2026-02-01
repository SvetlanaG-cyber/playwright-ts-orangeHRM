import { Page, Locator } from '@playwright/test';
import { SECTION_NAV_GROUPS, type SectionKey } from '../../config/section-nav.config';
import type { ISectionSubnav } from '../../types/section-nav.types';

/**
 * Полоса групп под оранжевым баннером (User Management | Job | … в Admin;
 * Configuration | Employee List | … в PIM). Данные групп — из section-nav.config.
 */
export class SectionSubnav implements ISectionSubnav {
  constructor(
    private readonly page: Page,
    private readonly section: SectionKey,
  ) { }

  get container(): Locator {
    return this.page.locator('[aria-label="Topbar Menu"]');
  }

  getGroup(name: string): Locator {
    const re = new RegExp(name, 'i');
    return this.container
      .getByRole('button', { name: re })
      .or(this.container.getByRole('link', { name: re }))
      .or(this.container.getByText(re));
  }

  get expectedGroupLabels(): readonly string[] {
    return SECTION_NAV_GROUPS[this.section].map((item) => item.label);
  }

  /** Локатор открытого dropdown-меню (после клика по группе). */
  get dropdownMenu(): Locator {
    return this.page.locator('.oxd-dropdown-menu').first();
  }

  /** Пункт в открытом dropdown по имени (menuitem или link). */
  getDropdownMenuItem(name: string): Locator {
    return this.dropdownMenu
      .getByRole('menuitem', { name: new RegExp(name, 'i') })
      .or(this.dropdownMenu.getByRole('link', { name: new RegExp(name, 'i') }));
  }
}
