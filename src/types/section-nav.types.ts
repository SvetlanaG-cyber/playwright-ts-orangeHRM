/**
 * Типы для подменю разделов (Admin, PIM и т.д.).
 * SectionKey расширяй при добавлении новых разделов (Leave, Time, …).
 */
export const SECTION_KEYS = ['Admin', 'PIM'] as const;
export type SectionKey = (typeof SECTION_KEYS)[number];

export type SectionNavItemType = 'link' | 'dropdown';

export interface SectionNavItem {
  label: string;
  type: SectionNavItemType;
}

export type SectionNavConfig = Record<SectionKey, readonly SectionNavItem[]>;

export interface ISectionSubnav {
  readonly container: import('@playwright/test').Locator;
  getGroup(name: string): import('@playwright/test').Locator;
  readonly expectedGroupLabels: readonly string[];
}
