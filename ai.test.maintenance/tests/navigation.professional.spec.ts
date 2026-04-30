import { expect, test } from '@playwright/test';
import { NavigationPanelRefactored } from '../components/navigationPanel.refactored';

test.describe('Navigation panel', () => {
  test('TC-NAV-001 | should verify Playwright navigation buttons: Docs, API', async ({ page }) => {
    const navigationPanel = new NavigationPanelRefactored(page);

    await test.step('Open Playwright homepage', async () => {
      await navigationPanel.openHomePage();
    });

    await test.step('Verify navigation buttons are visible and accessible', async () => {
      await expect(navigationPanel.docsLink).toBeVisible();
      await expect(navigationPanel.apiLink).toBeVisible();
    });

    await test.step('Verify navigation targets for Docs and API', async () => {
      await expect(navigationPanel.docsLink).toHaveAttribute('href', /\/docs/i);
      await expect(navigationPanel.apiLink).toHaveAttribute('href', /\/api/i);
    });

    await test.step('Validate Docs navigation works', async () => {
      await navigationPanel.clickDocs();
      await expect(page).toHaveURL(/\/docs/i);
    });

    await test.step('Edge case: API link should be visible and not marked disabled', async () => {
      await expect(navigationPanel.apiLink).not.toBeHidden();
      await expect(navigationPanel.apiLink).not.toHaveAttribute('aria-disabled', 'true');
    });
  });

  test('TC-NAV-002 | should not navigate to an invalid or broken URL', async ({ page }) => {
    const navigationPanel = new NavigationPanelRefactored(page);
    await navigationPanel.openHomePage();

    await test.step('Click API navigation link', async () => {
      await navigationPanel.clickApi();
    });

    await test.step('Verify navigation does not lead to a broken or error page', async () => {
      await expect(page).not.toHaveURL(/404|not-found|error/i);
      await expect(page).toHaveURL(/api/i);
    });

    await test.step('Ensure navigation link remains accessible after interaction', async () => {
      await expect(navigationPanel.apiLink).toBeVisible();
    });
  });
});
