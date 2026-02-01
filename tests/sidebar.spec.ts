import { test, expect } from '../src/fixtures/sidebar';
import { SIDEBAR_MENU_ITEMS, SIDEBAR_NAV } from '../src/config/sidebar.config';

test.describe('Sidebar', () => {
  test('contains expected menu items', async ({ sidebar }) => {
    for (const name of SIDEBAR_MENU_ITEMS) {
      const section = sidebar.getSection(name);
      await expect(section).toBeVisible();
    }
  });

  test('menu items count matches config', async ({ sidebar }) => {
    const navLinks = sidebar.container.getByRole('link');
    const navButtons = sidebar.container.getByRole('button');
    const items = navLinks.or(navButtons);
    const count = await items.count();

    expect(count).toBeGreaterThanOrEqual(SIDEBAR_MENU_ITEMS.length);
  });

  test('clicking each item opens page with expected endpoint', async ({ sidebar, page }) => {
    test.slow();
    for (const { name, pathSegment } of SIDEBAR_NAV) {
      await sidebar.goToSection(name);
      await expect(page).toHaveURL(new RegExp(pathSegment, 'i'));

      // Maintenance → purgeEmployee: сайдбар не виден, возвращаемся назад для следующих кликов
      if (page.url().includes('maintenance/purgeEmployee')) {
        await page.getByRole('button', { name: /cancel/i }).click();
      }
    }
  });
});
