/**
 * Ожидаемые пункты левого меню (Sidebar). Один источник правды для проверок и навигации.
 * pathSegment — подстрока URL после клика (для проверки endpoint).
 */
/** Пункты сайдбара (один источник правды для проверок). */
export const SIDEBAR_MENU_ITEMS = [
  'Admin',
  'PIM',
  'Leave',
  'Time',
  'Recruitment',
  'My Info',
  'Performance',
  'Dashboard',
  'Directory',
  'Maintenance',
  'Claim',
  'Buzz',
] as const;

export type SidebarMenuItem = (typeof SIDEBAR_MENU_ITEMS)[number];

/** Пункт меню → ожидаемый segment в URL (для навигации и проверки). */
export const SIDEBAR_NAV: ReadonlyArray<{ name: string; pathSegment: string }> = [
  { name: 'Admin', pathSegment: 'admin' },
  { name: 'PIM', pathSegment: 'pim' },
  { name: 'Leave', pathSegment: 'leave' },
  { name: 'Time', pathSegment: 'time' },
  { name: 'Recruitment', pathSegment: 'recruitment' },
  { name: 'My Info', pathSegment: 'viewPersonalDetails' },
  { name: 'Performance', pathSegment: 'performance' },
  { name: 'Dashboard', pathSegment: 'dashboard' },
  { name: 'Directory', pathSegment: 'directory' },
  { name: 'Maintenance', pathSegment: 'maintenance' },
  { name: 'Claim', pathSegment: 'claim' },
  { name: 'Buzz', pathSegment: 'buzz' },
];
