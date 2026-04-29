// path: src/pages/BasePage.ts

import { Page } from '@playwright/test';
import { logger } from '../utils/logger';

export abstract class BasePage {
  readonly page: Page;
  readonly url: string;

  constructor(page: Page, url: string = '') {
    this.page = page;
    this.url = url;
  }

  public async navigate(): Promise<void> {
    if (this.url) {
      logger.info(`Navigating to ${this.url}`);
      await this.page.goto(this.url);
    }
  }
}