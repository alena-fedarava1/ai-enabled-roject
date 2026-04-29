import { test } from '../../src/fixtures/fixtures';
import { TestData } from '../../src/testData/constants';

test.describe('Checkout Overview Tests', () => {
  test.beforeEach(
    async ({
      loginPage,
      inventoryPage,
      cartPage,
      checkoutInformationPage,
    }) => {
      await loginPage.login();
      await inventoryPage.addItemsToCart([
        TestData.products.backpack,
        TestData.products.bikeLight,
      ]);
      await inventoryPage.shoppingCartItemsCounter.click();
      await cartPage.proceedToCheckout();
      const { firstName, lastName, zip } = TestData.checkout.validFormData;
      await checkoutInformationPage.fillCheckoutForm(
        firstName,
        lastName,
        zip
      );
      await checkoutInformationPage.submitForm();
    }
  );

  test(
    'should display correct items ' +
    'and their number in checkout overview',
    async ({ checkoutOverviewPage }) => {
      await checkoutOverviewPage.verifyItemInSummary(
        TestData.products.backpack
      );
      await checkoutOverviewPage.verifyItemInSummary(
        TestData.products.bikeLight
      );
      await checkoutOverviewPage.verifyItemCount(2);
    }
  );

  test(
    'should calculate total price correctly',
    async ({ checkoutOverviewPage }) => {
      const prices = await checkoutOverviewPage.getItemPrices();
      const expectedTotal = prices.reduce(
        (sum, price) => sum + price,
        0
      );
      const actualTotal = await checkoutOverviewPage.getDisplayedItemTotal();
      test.expect(actualTotal).toBe(expectedTotal);
    }
  );

  test(
    'should complete checkout',
    async ({
      checkoutInformationPage,
      checkoutOverviewPage,
      checkoutComplete,
    }) => {
      await checkoutOverviewPage.finishCheckout();
      await test.expect(
        checkoutComplete.thankYouMessage
      ).toBeVisible();
      await test.expect(
        checkoutComplete.dispatchMessage
      ).toBeVisible();
    }
  );
});
