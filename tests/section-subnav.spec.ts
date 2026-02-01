import { test, expect } from '../src/fixtures/sidebar';
import { ADMIN_GROUP_MENU_ITEMS } from '../src/config/section-nav.config';
import { AdminPage } from '../src/pages/admin/AdminPage';

test.describe('SectionSubnav на Admin page', () => {
  test('под оранжевым баннером видны группы User Management, Job, Organization, Qualifications, Nationalities, Corporate Branding, Configuration и у каждой свои menu items', async ({
    page,
    sidebar,
  }) => {
    const appPage = new AdminPage(page);
    await appPage.goto();
    const { sectionSubnav } = appPage;
    await expect(sectionSubnav.container).toBeVisible({ timeout: 20000 });

    for (const groupLabel of Object.keys(ADMIN_GROUP_MENU_ITEMS)) {
      const group = sectionSubnav.getGroup(groupLabel);
      await expect(group).toBeVisible();
    }

    for (const [groupLabel, menuItems] of Object.entries(ADMIN_GROUP_MENU_ITEMS)) {
      if (menuItems.length === 0) continue;

      await sectionSubnav.getGroup(groupLabel).click();

      for (const itemName of menuItems) {
        const item = sectionSubnav.getDropdownMenuItem(itemName);
        await expect(item).toBeVisible();
      }

      await page.keyboard.press('Escape');
    }
  });
});
