import type { SectionNavConfig, SectionKey } from '../types/section-nav.types';

/**
 * Единственный источник правды для групп подменю по разделам.
 * Добавление/изменение пунктов — только здесь.
 */
export const SECTION_NAV_GROUPS: SectionNavConfig = {
  Admin: [
    { label: 'User Management', type: 'dropdown' },
    { label: 'Job', type: 'dropdown' },
    { label: 'Organization', type: 'dropdown' },
    { label: 'Qualifications', type: 'dropdown' },
    { label: 'Nationalities', type: 'link' },
    { label: 'Corporate Branding', type: 'link' },
    { label: 'Configuration', type: 'dropdown' },
  ],
  PIM: [
    { label: 'Configuration', type: 'dropdown' },
    { label: 'Employee List', type: 'link' },
    { label: 'Add Employee', type: 'link' },
    { label: 'Reports', type: 'link' },
  ],
} as const;

export type { SectionKey } from '../types/section-nav.types';

/**
 * Подпункты (menu items) для каждой группы Admin. Группы-ссылки (link) — пустой массив.
 */
export const ADMIN_GROUP_MENU_ITEMS: Record<string, readonly string[]> = {
  'User Management': ['Users'],
  'Job': ['Job Titles', 'Pay Grades', 'Employment Status'],
  'Organization': ['General Information', 'Locations', 'Structure'],
  'Qualifications': ['Skills', 'Education', 'Licenses', 'Languages', 'Memberships'],
  'Nationalities': [],
  'Corporate Branding': [],
  'Configuration': ['Localization', 'Language Packages', 'Modules', 'Email Configuration', 'Email Subscriptions', 'Social Media Authentication', 'Register OAuth Client', 'LDAP Configuration'],
};

/**
 * Подпункты (menu items) для каждой группы PIM. Группы-ссылки (link) — пустой массив.
 */
export const PIM_GROUP_MENU_ITEMS: Record<string, readonly string[]> = {
  'Configuration': ['Optional Fields', 'Custom Fields', 'Data Import', 'Reporting Methods', 'Termination Reasons'],
  'Employee List': [],
  'Add Employee': [],
  'Reports': [],
};

/** Menu items по секции (Admin, PIM, …). Для тестов и SectionSubnav. */
export const SECTION_GROUP_MENU_ITEMS: Record<SectionKey, Record<string, readonly string[]>> = {
  Admin: ADMIN_GROUP_MENU_ITEMS,
  PIM: PIM_GROUP_MENU_ITEMS,
};
