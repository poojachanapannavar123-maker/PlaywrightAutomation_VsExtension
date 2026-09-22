import test from "@playwright/test";
// import { LoginPage } from "../pages/loginPage";
// import { CategoryPage } from "../pages/categoryPage";
// import { ProductDetailsPage } from "../pages/productDetailsPage";
import { PageObjectManager } from "../pages/pageObjectManager";

test("Login actions", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  let userName = process.env.USERNAME!;
  let password = process.env.PASSWORD!;
  let productName = "Sauce Labs Backpack";

  // const loginPage = new LoginPage(page);
  // await loginPage.goTo();
  // await loginPage.loginMethod(userName, password);

  // const productPage = new CategoryPage(page);
  // await productPage.searchProduct(productName);

  // const productDetailsPage = new ProductDetailsPage(page);
  // await productDetailsPage.verifyProductDetails(productName);

  const pageObjectManagerObject = new PageObjectManager(page);

  const loginPage = await pageObjectManagerObject.getLoginPage();
  await loginPage.goTo();
  await loginPage.loginMethod(userName, password);

  const categoryPage = await pageObjectManagerObject.getCategoryPage();
  await categoryPage.searchProduct(productName);

  const productDetailsPage =
    await pageObjectManagerObject.getProductDetailsPage();
  await productDetailsPage.verifyProductDetails(productName);
});
