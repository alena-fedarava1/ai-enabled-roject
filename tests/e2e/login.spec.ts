import { test } from '../../src/fixtures/fixtures';
import { TestData } from '../../src/testData/constants';

test.describe('Login Tests', () => {
  test('should login successfully with valid credentials', async ({ loginPage }) => {
    await loginPage.login();

    await test.expect(loginPage.page).toHaveURL(TestData.urls.inventory);
  });

  test('should show error with invalid credentials', async ({ loginPage }) => {
    await loginPage.login(
      TestData.login.invalidUsername,
      TestData.login.invalidPassword
    );

    await test.expect(loginPage.errorMessage).toContainText(
      TestData.login.errorMessage
    );
  });
})