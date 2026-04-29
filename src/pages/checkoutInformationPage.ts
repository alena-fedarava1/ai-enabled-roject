import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { EnvHelper } from '../utils/envHelper';
import { logger } from '../utils/logger';

export class CheckoutInformationPage extends BasePage {
  public readonly firstNameInput: Locator;
  public readonly lastNameInput: Locator;
  public readonly zipInput: Locator;
  public readonly continueButton: Locator;
  public readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page, `${EnvHelper.getBaseUrl()}/checkout-step-one.html`);
    this.firstNameInput = this.page.locator('[data-test="firstName"]');
    this.lastNameInput = this.page.locator('[data-test="lastName"]');
    this.zipInput = this.page.locator('[data-test="postalCode"]');
    this.continueButton = this.page.locator('[data-test="continue"]');
    this.errorMessage = this.page.locator('[data-test="error"]');
  }

  public async fillCheckoutForm(
    firstName: string,
    lastName: string,
    zip: string
  ): Promise<void> {
    logger.info(
      `Filling checkout information for ${firstName} ${lastName}`
    );
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.zipInput.fill(zip);
  }

  public async submitForm(): Promise<void> {
    logger.info('Submitting checkout information');
    await this.continueButton.click();
  }
}
