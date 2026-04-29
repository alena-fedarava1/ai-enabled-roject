import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { EnvHelper } from '../utils/envHelper';
import { logger } from '../utils/logger';

export class InventoryPage extends BasePage {
  public readonly shoppingCartItemsCounter: Locator;
  public readonly sortDropdown: Locator;
  public readonly inventoryItems: Locator;
  public readonly addToCartButton: Locator;
  public readonly removeButton: Locator;

  constructor(page: Page) {
    super(page, `${EnvHelper.getBaseUrl()}/inventory.html`);
    this.shoppingCartItemsCounter = this.page.locator('.shopping_cart_badge');
    this.sortDropdown = this.page.locator(
      'select[data-test="product-sort-container"]'
    );
    this.inventoryItems = this.page.locator('[data-test="inventory-item"]');
    this.addToCartButton = this.page.locator(
      'button:has-text("Add to cart")'
    );
    this.removeButton = this.page.locator('button:has-text("Remove")');
  }

  private getItemByName(itemName: string): Locator {
    return this.inventoryItems.filter({ hasText: itemName });
  }

  public async addItemsToCart(itemName: string | string[]): Promise<void> {
    const items = Array.isArray(itemName) ? itemName : [itemName];
    logger.info(`Adding inventory items to cart: ${items.join(', ')}`);
    for (const name of items) {
      const item = this.getItemByName(name);
      await item.locator(this.addToCartButton).click();
    }
  }

  public async removeItem(itemName: string): Promise<void> {
    logger.info(`Removing inventory item from cart: ${itemName}`);
    const item = this.getItemByName(itemName);
    await item.locator(this.removeButton).click();
  }

  public async sortByPrice(direction: string): Promise<void> {
    const normalizedDirection = direction.toLowerCase();
    const optionValue = normalizedDirection.includes('low') ? 'lohi' : 'hilo';

    logger.info(`Sorting inventory by price: ${direction}`);
    await this.sortDropdown.waitFor({ state: 'visible' });
    await this.sortDropdown.selectOption(optionValue);
  }

  public async verifySortingByPrice(direction: string): Promise<boolean> {
    const normalizedDirection = direction.toLowerCase();
    const priceValues = await this.inventoryItems.evaluateAll((items) => {
      const prices: number[] = [];
      items.forEach((item) => {
        const priceElement = item.querySelector('.inventory_item_price');
        const priceText = priceElement?.textContent?.trim() || '';
        prices.push(parseFloat(priceText.replace('$', '')));
      });
      return prices;
    });

    const sortedValues = [...priceValues].sort((a, b) => a - b);
    logger.debug(`Inventory prices: ${priceValues.join(', ')}`);
    if (normalizedDirection.includes('low')) {
      return priceValues.every(
        (value, index) => value === sortedValues[index]
      );
    }

    const descendingValues = sortedValues.reverse();
    return priceValues.every(
      (value, index) => value === descendingValues[index]
    );
  }
}
