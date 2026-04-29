const DEFAULT_BASE_URL = 'https://www.saucedemo.com';
const DEFAULT_USERNAME = 'standard_user';
const DEFAULT_PASSWORD = 'secret_sauce';
const DEFAULT_BROWSER = 'chromium';

export class EnvHelper {
  public static getBaseUrl(): string {
    return process.env.BASE_URL?.trim() || DEFAULT_BASE_URL;
  }

  public static getUsername(): string {
    return process.env.APP_USERNAME?.trim() || DEFAULT_USERNAME;
  }

  public static getPassword(): string {
    return process.env.APP_PASSWORD?.trim() || DEFAULT_PASSWORD;
  }

  public static getBrowser(): string {
    return process.env.BROWSER?.trim() || DEFAULT_BROWSER;
  }

  public static isHeadless(): boolean {
    return process.env.HEADLESS?.trim().toLowerCase() === 'true';
  }
}