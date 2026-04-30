import { expect, test } from '@playwright/test';
import { NavigationPanel } from '../components/navigationPanel';

test.describe('Navigation panel', () => {
  test('should display navigation buttons: Docs, API', async ({ page }) => {
    const navigationPanel = new NavigationPanel(page);

    await navigationPanel.openHomePage();

    await page.waitForTimeout(2000);
    expect(await navigationPanel.docsLink.isVisible()).toBe(true);

    await expect(navigationPanel.apiLink).toBeVisible();
  });
});
