import { testUsers, products } from "../testdata/credentials";
import { test } from "../fixtures/contextFixture";

for (const user of testUsers) {
  test.describe("Sauce Demo", () => {
    test(
      `TID004-category actions - ${user.userName}`,
      { tag: ["@products", "@smoke"] },
      async ({ loginAs, productsPage }) => {
        await loginAs(user.userName, user.password);
        await productsPage.randomlypickedproduct();
      }
    );

    test(
      `TID05- Add selected product to the cart - ${user.userName}`,
      { tag: ["@products", "@smoke"] },
      async ({ loginAs, productsPage }) => {
        await loginAs(user.userName, user.password);
        await productsPage.addToCartMethod();
      }
    );

    test(
      `TID06 - Cart Badge count verification - ${user.userName}`,
      { tag: ["@products", "@smoke"] },
      async ({ loginAs, productsPage }) => {
        await loginAs(user.userName, user.password);

        for (let count = 1; count <= 6; count++) {
          await productsPage.addToCartMethod();
          await productsPage.verifyCartBadge(count.toString());
        }
      }
    );

    test(
      `TID07- Search product - ${user.userName}`,
      { tag: ["@products", "@regression"] },
      async ({ loginAs, productsPage }) => {
        await loginAs(user.userName, user.password);
        await productsPage.filteredProduct(products);
      }
    );
  });
}
