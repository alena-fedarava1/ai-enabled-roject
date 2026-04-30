import { expect, test } from '@playwright/test';
import { NavigationPanelRefactored } from '../components/navigationPanel.refactored';

test.describe('Navigation panel', () => {
  test('should display navigation buttons: Docs, API', async ({ page }) => {
    const navigationPanel = new NavigationPanelRefactored(page);

    await test.step('Open Playwright homepage', async () => {
      await navigationPanel.openHomePage();
    });

    await test.step('Verify navigation buttons are visible and accessible', async () => {
      await expect(navigationPanel.docsLink).toBeVisible();
      await expect(navigationPanel.apiLink).toBeVisible();
    });

    await test.step('Verify navigation targets for docs, api, and community', async () => {
      await expect(navigationPanel.docsLink).toHaveAttribute('href', /\/docs/i);
      await expect(navigationPanel.apiLink).toHaveAttribute('href', /\/api/i);
    });

    await test.step('Validate Docs navigation works', async () => {
      await navigationPanel.clickDocs();
      await expect(page).toHaveURL(/\/docs/i);
    });
  });
});
