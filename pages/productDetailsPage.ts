import { Page, Locator, expect } from "@playwright/test";

export class ProductDetailsPage {
  page: Page;
  addtoCartvisible: Locator;
  productNameonDetailspage: Locator;
  priceonpdp: Locator;
  imageonpdp: Locator;
  descriptiononpdp: Locator;
  removeButton: Locator;
  cartBadge: Locator;
  backtoproductNaviagtion: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productNameonDetailspage = page.locator(
      '.inventory_details [data-test="inventory-item-name"]'
    );
    this.priceonpdp = page.locator(
      '.inventory_details [data-test="inventory-item-price"]'
    );
    this.imageonpdp = page.locator(".inventory_details_img");
    this.descriptiononpdp = page.locator(
      '.inventory_details [data-test="inventory-item-desc"]'
    );
    this.addtoCartvisible = page
      .locator(".inventory_details")
      .getByRole("button", { name: "Add to cart", exact: true });

    this.removeButton = page.getByRole("button", { name: "Remove" });
    this.cartBadge = this.page.locator('[data-test="shopping-cart-badge"]');
    this.backtoproductNaviagtion = this.page.locator(
      '[data-test="back-to-products"]'
    );
  }

  /**
   * Verifies the product details page including productName,productPrice,productImage,description and add to cart buttons
   * @param productName
   * @param productPrice
   * @param productImage
   * @returns A promise that resolves when all product details assertion passes
   * @author Pooja
   */
  async verifyProductDetails(
    productName: string,
    productPrice: string,
    productImage: string
  ) {
    await expect(this.productNameonDetailspage).toHaveText(productName);
    await expect(this.priceonpdp).toHaveText(productPrice);
    await expect(this.imageonpdp).toHaveAttribute("src", productImage);
    await expect(this.descriptiononpdp).not.toBeEmpty();
    await expect(this.addtoCartvisible).toBeVisible();
    await expect(this.addtoCartvisible).toBeEnabled();
  }

  /**
   * Verifies Add to cart button and remove button behaviour on product details page and cart badge updates
   * Checks that adding a product displays the Remove button and updates the cart badge to 1, then verifies that removing the product resets the cart.
   * @returns A promise that resolves when all the assertion passes
   * @author Pooja
   */
  async verifyRemovebutton() {
    await expect(this.addtoCartvisible).toBeVisible();
    await expect(this.cartBadge).not.toBeVisible();

    await this.addtoCartvisible.click();
    await expect(this.removeButton).toBeVisible();

    await expect(this.cartBadge).toHaveText("1");
    await this.removeButton.click();
    await expect(this.addtoCartvisible).toBeVisible();
    await expect(this.cartBadge).not.toBeVisible();
  }

  /**
   * Verifies the successful navigation of the back to products page button and verifies the assertion on respective landing page
   * @return A promise that resolves when navigation and the URL assertion passes
   * @author Pooja
   */
  async verifyBacktoProductsNavigation() {
    await this.backtoproductNaviagtion.click();
    await expect(this.page).toHaveURL(/inventory\.html/);
  }
}
