import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class DocPage extends BasePage {
  readonly heading: Locator;
  readonly introductionSection: Locator;
  readonly breadcrumb: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { name: /Installation/ });
    this.introductionSection = page.getByRole('heading', {
      name: /Introduction/i,
    });
    this.breadcrumb = page.getByRole('link', { name: /Home page/i });
  }

  async isInstallationHeadingVisible(): Promise<boolean> {
    await this.heading.waitFor({ state: 'visible', timeout: 10000 });
    return this.heading.isVisible();
  }

  async openDocsPage(): Promise<void> {
    await this.goto('https://playwright.dev/docs/intro');
  }

  async navigateHome(): Promise<void> {
    await this.breadcrumb.click();
  }

  async getPageTitle(): Promise<string> {
    return this.page.title();
  }
}
