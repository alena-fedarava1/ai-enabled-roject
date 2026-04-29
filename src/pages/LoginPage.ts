import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { EnvHelper } from '../utils/envHelper';
import { logger } from '../utils/logger';

export class LoginPage extends BasePage {
  public readonly usernameInput: Locator;
  public readonly passwordInput: Locator;
  public readonly loginButton: Locator;
  public readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page, EnvHelper.getBaseUrl());
    this.usernameInput = this.page.locator('[data-test="username"]');
    this.passwordInput = this.page.locator('[data-test="password"]');
    this.loginButton = this.page.getByRole('button', {
      name: 'Login',
    });
    this.errorMessage = this.page.locator('[data-test="error"]');
  }

  public async login(username?: string, password?: string): Promise<void> {
    const user = username || EnvHelper.getUsername();
    const pass = password || EnvHelper.getPassword();

    logger.info(`Attempting login as ${user}`);
    await this.fillUsername(user);
    await this.fillPassword(pass);
    await this.clickLoginButton();
  }

  public async fillUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  public async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  public async clickLoginButton(): Promise<void> {
    await this.loginButton.click();
  }
}
