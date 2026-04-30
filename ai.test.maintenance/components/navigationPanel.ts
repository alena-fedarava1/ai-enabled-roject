import { Locator, Page } from '@playwright/test';
import { BasePage } from '../pages/BasePage';

export class NavigationPanel extends BasePage {
  readonly docsLink: Locator;
  readonly apiLink: Locator;

  constructor(page: Page) {
    super(page);
    this.docsLink = page.locator('#docs');
    this.apiLink = page.getByRole('link', { name: /^API$/i });
  }

  async openHomePage(): Promise<void> {
    await this.goto('https://playwright.dev');
  }
}
