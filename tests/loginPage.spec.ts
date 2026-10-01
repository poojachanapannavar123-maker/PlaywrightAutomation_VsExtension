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
        const categoryPage = await PageObjectManager.getCategoryPage();
        const productName = await categoryPage.randomlypickedcategory();
      }
    );

    test(
      `TID003-product description page actions - ${user.userName}`,
      { tag: "@pdp" },
      async ({ PageObjectManager }) => {
        const loginPage = await PageObjectManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.loginMethod(user.userName, user.password);
        const categoryPage = await PageObjectManager.getCategoryPage();
        const productName = await categoryPage.randomlypickedcategory();
        const productDetailsPage =
          await PageObjectManager.getProductDetailsPage();
        await productDetailsPage.verifyProductDetails(productName);
      }
    );
  });
}
