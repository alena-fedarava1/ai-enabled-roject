import { test, expect } from '@playwright/test';
import { DocPage } from '../pages/DocPage';

test.describe('Playwright Documentation Page', () => {
  test(
    'should display introduction section on documentation page',
    async ({ page }) => {
      const docPage = new DocPage(page);
      await docPage.openDocsPage();
      await expect(docPage.introductionSection).toBeVisible();
    }
  );
});
