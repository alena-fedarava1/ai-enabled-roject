import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class PlaywrightHomePage extends BasePage {
  readonly getStartedButton: Locator;
  readonly heading: Locator;

  constructor(page: Page) {
    super(page);
    this.getStartedButton = page.getByRole('link', { name: /Get started/i });
    this.heading = page.getByRole('heading', {
      name: /Playwright enables reliable web automation/i,
    });
  }

  async navigateToHome(): Promise<void> {
    await this.goto('https://playwright.dev');
  }

  async clickGetStarted(): Promise<void> {
    await Promise.all([
      this.page.waitForURL('**/docs/intro'),
      this.getStartedButton.click(),
    ]);
  }
}
