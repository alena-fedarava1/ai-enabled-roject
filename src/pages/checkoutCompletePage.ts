// path: src/pages/checkoutComplete.ts

import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { EnvHelper } from '../utils/envHelper';

export class CheckoutComplete extends BasePage {
  public readonly thankYouMessage: Locator;
  public readonly dispatchMessage: Locator;

  constructor(page: Page) {
    super(page, `${EnvHelper.getBaseUrl()}/checkout-complete.html`);
    this.thankYouMessage = this.page.getByRole('heading', {
      name: 'Thank you for your order!',
    });
    this.dispatchMessage = this.page.getByText(
      'Your order has been dispatched, and will arrive ' +
      'just as fast as the pony can get there!'
    );
  }
}