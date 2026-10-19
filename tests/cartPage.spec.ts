import { test } from "../fixtures/contextFixture";
import { testUsers } from "../testdata/credentials";

for (const user of testUsers) {
  test.describe("Sauce Demo - Cart Page", () => {
    test(
      `TID011- Cart page verification - ${user.userName}`,
      { tag: ["@cart", "@smoke"] },
      async ({ loginAs, productsPage, cartPage }) => {
        await loginAs(user.userName, user.password);
        const productName = await productsPage.addToCartMethod();
        await productsPage.goToCart();
        await cartPage.verifyCartDetails(productName);
      }
    );
  });
}
