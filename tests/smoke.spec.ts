import { testUsers, products } from "../testdata/credentials";
import { test } from "../fixtures/contextFixture";

for (const user of testUsers) {
  test.describe("Sauce Demo", () => {
    test(
      `TID007-Login actions - ${user.userName}`,
      { tag: "@login" },
      async ({ loginAs }) => {
        await loginAs(user.userName, user.password);
      }
    );

    test(
      `TID008-category actions - ${user.userName}`,
      { tag: "@category" },
      async ({ loginAs, productsPage }) => {
        await loginAs(user.userName, user.password);
        await productsPage.randomlypickedproduct();
      }
    );

    test(
      `TID009-product description page actions - ${user.userName}`,
      { tag: "@pdp" },
      async ({ loginAs, productsPage, productDetailsPage }) => {
        test.skip(
          user.userName === "visual_user",
          "PDP price consistency test is for standard users"
        );
        await loginAs(user.userName, user.password);

        const selectedProduct = await productsPage.randomlypickedproduct();

        await productDetailsPage.verifyProductDetails(
          selectedProduct.productName,
          selectedProduct.productPrice,
          selectedProduct.productImage
        );
      }
    );

    test(
      `TID010- Add selected product to the cart - ${user.userName}`,
      { tag: "@AddtoCart" },
      async ({ loginAs, productsPage }) => {
        await loginAs(user.userName, user.password);

        await productsPage.addToCartMethod();
      }
    );

    test(
      `TID011- Cart page verification - ${user.userName}`,
      { tag: "@verifycart" },
      async ({ loginAs, productsPage, cartPage }) => {
        await loginAs(user.userName, user.password);

        const productName = await productsPage.addToCartMethod();
        await productsPage.goToCart();

        await cartPage.verifyCartDetails(productName);
      }
    );

    test(
      `TID012 - Cart Badge count verification - ${user.userName}`,
      { tag: "@basketcount" },
      async ({ loginAs, productsPage }) => {
        await loginAs(user.userName, user.password);

        await productsPage.addToCartMethod();
        await productsPage.verifyCartBadge("1");
      }
    );

    test(
      `TID013- Search product - ${user.userName}`,
      { tag: "@filteredproduct" },
      async ({ loginAs, productsPage }) => {
        await loginAs(user.userName, user.password);

        await productsPage.filteredProduct(products);
      }
    );
  });
}
