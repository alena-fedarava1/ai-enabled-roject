import { test, expect } from '@playwright/test';
import { PlaywrightHomePage } from '../pages/PlaywrightHomePage';
import { DocPage } from '../pages/DocPage';

test.describe('Playwright Home Page', () => {
  test(
    'should load home page and display main heading',
    async ({ page }) => {
      const homePage = new PlaywrightHomePage(page);
      await homePage.navigateToHome();
      await expect(homePage.heading).toBeVisible();
    }
  );

  test(
    'should have Get Started button visible on home page',
    async ({ page }) => {
      const homePage = new PlaywrightHomePage(page);
      await homePage.navigateToHome();
      await expect(homePage.getStartedButton).toBeVisible();
    }
  );

    test(
      'should navigate from home to documentation page via Get Started',
      async ({ page }) => {
        const homePage = new PlaywrightHomePage(page);
        await homePage.navigateToHome();
        await homePage.clickGetStarted();
  
        const docPage = new DocPage(page);
        await expect(docPage.heading).toBeVisible();
      }
    );
});
