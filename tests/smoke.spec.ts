import { testUsers } from "../testdata/credentials";
import { test } from "../fixtures/contextFixture";

for (const user of testUsers) {
  test.describe("Sauce Demo", () => {
    test(
      `TID001-Login actions - ${user.userName}`,
      { tag: "@login" },
      async ({ PageObjectManager }) => {
        const loginPage = await PageObjectManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.loginMethod(user.userName, user.password);
      }
    );

    test(
      `TID002-category actions - ${user.userName}`,
      { tag: "@category" },
      async ({ PageObjectManager }) => {
        const loginPage = await PageObjectManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.loginMethod(user.userName, user.password);
        const productsPage = await PageObjectManager.getProductsPage();
        const productName = await productsPage.randomlypickedproduct();
      }
    );

    test(
      `TID003-product description page actions - ${user.userName}`,
      { tag: "@pdp" },
      async ({ PageObjectManager }) => {
        const loginPage = await PageObjectManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.loginMethod(user.userName, user.password);
        const productsPage = await PageObjectManager.getProductsPage();
        const productName = await productsPage.randomlypickedproduct();
        const productDetailsPage =
          await PageObjectManager.getProductDetailsPage();
        await productDetailsPage.verifyProductDetails(productName);
      }
    );

    test(
      `TID004- Add selected product to the cart - ${user.userName}`,
      { tag: "@AddtoCart" },
      async ({ PageObjectManager }) => {
        const loginPage = await PageObjectManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.loginMethod(user.userName, user.password);
        const productsPage = await PageObjectManager.getProductsPage();
        await productsPage.addToCartMethod();
      }
    );

    test(
      `TID005- Cart page verification - ${user.userName}`,
      { tag: "@verifycart" },
      async ({ PageObjectManager }) => {
        const loginPage = await PageObjectManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.loginMethod(user.userName, user.password);
        const productsPage = await PageObjectManager.getProductsPage();
        const productName = await productsPage.addToCartMethod();
        await productsPage.goToCart();
        const cartPage = await PageObjectManager.getCartPage();
        await cartPage.verifyCartDetails(productName);
      }
    );

    test(
      `TID006- Cart Badge count verification - ${user.userName}`,
      { tag: "@basketcount" },
      async ({ PageObjectManager }) => {
        const loginPage = await PageObjectManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.loginMethod(user.userName, user.password);
        const productsPage = await PageObjectManager.getProductsPage();
        await productsPage.addToCartMethod();
        await productsPage.verifyCartBadge("1");
      }
    );
  });
}
