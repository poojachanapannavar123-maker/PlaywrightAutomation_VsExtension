import test from "@playwright/test";
// import { LoginPage } from "../pages/loginPage";
// import { CategoryPage } from "../pages/categoryPage";
// import { ProductDetailsPage } from "../pages/productDetailsPage";
// import { PageObjectManager } from "../pages/pageObjectManager";
import { testUsers } from "../testdata/credentials";
import { testBase } from "../fixtures/contextFixture";

for (const user of testUsers) {
  testBase.describe("Sauce Demo", () => {
    testBase(
      `TID001-Login actions - ${user.userName}`,
      { tag: "@login" },
      async ({ PageObjectManager }) => {
        const loginPage = await PageObjectManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.loginMethod(user.userName, user.password);
      }
    );

    testBase(
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

    testBase(
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
