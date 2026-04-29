import { test } from '../../src/fixtures/fixtures';
import { TestData } from '../../src/testData/constants';

test.describe('Cart Tests', () => {
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    await loginPage.login();
    await inventoryPage.addItemsToCart(TestData.products.backpack);
    await inventoryPage.shoppingCartItemsCounter.click();
  });

  test('should remove selected item from cart', async ({ cartPage }) => {
    await cartPage.removeItem(TestData.products.backpack);

    await test.expect(
      cartPage.cartItem.filter({ hasText: TestData.products.backpack })
    ).toHaveCount(0);
  });

  test('should return to inventory page and continue shopping', async ({ cartPage }) => {
    await cartPage.continueShopping();

    await test.expect(cartPage.page).toHaveURL(TestData.urls.inventory);
  });

  test('should proceed to checkout', async ({ cartPage }) => {
    await cartPage.proceedToCheckout();

    await test.expect(cartPage.page).toHaveURL(
      TestData.urls.checkoutInformationPage
    );
  });
})
