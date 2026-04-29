import { test } from '../../src/fixtures/fixtures';
import { TestData } from '../../src/testData/constants';

test.describe('Checkout Your Information Tests', () => {
  test.beforeEach(
    async ({ loginPage, inventoryPage, cartPage }) => {
      await loginPage.login();
      await inventoryPage.addItemsToCart([
        TestData.products.backpack,
        TestData.products.bikeLight,
      ]);
      await inventoryPage.shoppingCartItemsCounter.click();
      await cartPage.proceedToCheckout();
    }
  );

  test(
    'should add first, last name, zip and successfully submit the form',
    async ({ checkoutInformationPage, checkoutOverviewPage }) => {
      const { firstName, lastName, zip } = TestData.checkout.validFormData;
      await checkoutInformationPage.fillCheckoutForm(
        firstName,
        lastName,
        zip
      );
      await checkoutInformationPage.submitForm();
      await test.expect(checkoutOverviewPage.page).toHaveURL(
        TestData.urls.checkoutOverviewPage
      );
    }
  );

  TestData.checkout.emptyFieldValidations.forEach((testCase) => {
    test(
      `should receive error when field is empty: ${testCase.errorMessage.split(' ')[0]}`,
      async ({ checkoutInformationPage }) => {
        await checkoutInformationPage.fillCheckoutForm(
          testCase.firstName,
          testCase.lastName,
          testCase.zip
        );
        await checkoutInformationPage.submitForm();
        await test.expect(
          checkoutInformationPage.errorMessage
        ).toContainText(testCase.errorMessage);
      }
    );
  });
})
