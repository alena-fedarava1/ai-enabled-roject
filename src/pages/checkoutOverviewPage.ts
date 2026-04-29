import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { EnvHelper } from '../utils/envHelper';
import { logger } from '../utils/logger';

export class CheckoutOverviewPage extends BasePage {
  public readonly finishButton: Locator;
  public readonly itemNames: Locator;
  public readonly itemPrices: Locator;
  public readonly itemTotalLabel: Locator;

  constructor(page: Page) {
    super(page, `${EnvHelper.getBaseUrl()}/checkout-step-two.html`);
    this.finishButton = this.page.locator('[data-test="finish"]');
    this.itemNames = this.page.locator('.inventory_item_name');
    this.itemPrices = this.page.locator('.inventory_item_price');
    this.itemTotalLabel = this.page.locator('.summary_subtotal_label');
  }

  public async finishCheckout(): Promise<void> {
    logger.info('Finishing checkout from overview');
    await this.finishButton.click();
  }

  public async verifyItemInSummary(itemName: string): Promise<void> {
    await expect(this.itemNames.filter({ hasText: itemName })).toBeVisible();
  }

  public async verifyItemCount(expectedCount: number): Promise<void> {
    await expect(this.itemNames).toHaveCount(expectedCount);
  }

  public async getItemPrices(): Promise<number[]> {
    const priceTexts = await this.itemPrices.allTextContents();
    logger.debug(`Item prices: ${priceTexts.join(', ')}`);
    return priceTexts.map(
      (text) => parseFloat(text.replace('$', '').trim())
    );
  }

  public async getDisplayedItemTotal(): Promise<number> {
    const text = await this.itemTotalLabel.textContent();
    const numericText =
      text?.replace('Item total: $', '').trim() || '0';
    logger.debug(`Displayed item total: ${numericText}`);
    return parseFloat(numericText);
  }
}
