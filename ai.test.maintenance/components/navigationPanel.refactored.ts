import { Locator, Page } from '@playwright/test';
import { BasePage } from '../pages/BasePage';

export class NavigationPanelRefactored extends BasePage {
  readonly docsLink: Locator;
  readonly apiLink: Locator;

  constructor(page: Page) {
    super(page);
    this.docsLink = page.getByRole('link', { name: /^Docs$/i });
    this.apiLink = page.getByRole('link', { name: /^API$/i });
    }

  async openHomePage(): Promise<void> {
    await this.goto('https://playwright.dev');
  }

  async clickDocs(): Promise<void> {
    await this.docsLink.click();
  }

  async clickApi(): Promise<void> {
    await this.apiLink.click();
  }
}
