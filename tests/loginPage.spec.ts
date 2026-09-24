import test from "@playwright/test";
// import { LoginPage } from "../pages/loginPage";
// import { CategoryPage } from "../pages/categoryPage";
// import { ProductDetailsPage } from "../pages/productDetailsPage";
// import { PageObjectManager } from "../pages/pageObjectManager";
import { testUsers } from "../testdata/credentials";
import { testBase } from "../utils/fixtures/contextFixture";

for (const user of testUsers) {
  testBase.describe("Sauce Demo", async () => {
    testBase(
      `Login actions - ${user.userName}`,
      async ({ PageObjectManager }) => {
        // const context = await browser.newContext();
        // const page = await context.newPage();

        // let userName = process.env.USERNAME!;
        // let password = process.env.PASSWORD!;
        let productName: string;

        // const loginPage = new LoginPage(page);
        // await loginPage.goTo();
        // await loginPage.loginMethod(userName, password);

        // const productPage = new CategoryPage(page);
        // await productPage.searchProduct(productName);

        // const productDetailsPage = new ProductDetailsPage(page);
        // await productDetailsPage.verifyProductDetails(productName);

        // const pageObjectManagerObject = new PageObjectManager(page);

        await test.step(`Login actions - ${user.userName}`, async () => {
          const loginPage = await PageObjectManager.getLoginPage();
          await loginPage.goTo();
          await loginPage.loginMethod(user.userName, user.password);
        });

        await test.step("Category page actions", async () => {
          const categoryPage = await PageObjectManager.getCategoryPage();
          productName = await categoryPage.randomlypickedcategory();
        });

        await test.step("Product details Page actions", async () => {
          const productDetailsPage =
            await PageObjectManager.getProductDetailsPage();
          await productDetailsPage.verifyProductDetails(productName);
        });
      }
    );
  });
}
