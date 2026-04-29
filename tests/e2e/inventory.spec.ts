import { test } from '../../src/fixtures/fixtures';
import { TestData } from '../../src/testData/constants';

test.describe('Inventory Tests', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.login();
  });

  test('should sort by price from low to high', async ({ inventoryPage }) => {
    await inventoryPage.sortByPrice('low');
    const isSorted = await inventoryPage.verifySortingByPrice('low');

    test.expect(isSorted).toBe(true);
  });

  test('should sort by price from high to low', async ({ inventoryPage }) => {
    await inventoryPage.sortByPrice('high');
    const isSorted = await inventoryPage.verifySortingByPrice('high');

    test.expect(isSorted).toBe(true);
  });

  test('should add multiple items to cart', async ({ inventoryPage }) => {
    await inventoryPage.addItemsToCart([
      TestData.products.backpack,
      TestData.products.bikeLight,
    ]);

    await test.expect(inventoryPage.shoppingCartItemsCounter).toContainText('2');
  });
});
