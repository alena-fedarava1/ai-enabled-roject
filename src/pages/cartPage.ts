import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { EnvHelper } from '../utils/envHelper';
import { logger } from '../utils/logger';

export class CartPage extends BasePage {
  public readonly cartItem: Locator;
  public readonly continueShoppingButton: Locator;
  public readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page, `${EnvHelper.getBaseUrl()}/cart.html`);
    this.cartItem = this.page.locator('.cart_item');
    this.continueShoppingButton = this.page.getByRole('button', {
      name: 'Continue Shopping',
    });
    this.checkoutButton = this.page.getByRole('button', {
      name: 'Checkout',
    });
  }

  public async removeItem(itemName: string): Promise<void> {
    logger.info(`Removing item from cart: ${itemName}`);
    const itemRow = this.cartItem.filter({ hasText: itemName });
    await itemRow.getByRole('button', {
      name: 'Remove',
    }).click();
  }

  public async proceedToCheckout(): Promise<void> {
    logger.info('Proceeding to checkout from cart');
    await this.checkoutButton.click();
  }

  public async continueShopping(): Promise<void> {
    logger.info('Continuing shopping from cart');
    await this.continueShoppingButton.click();
  }
}
