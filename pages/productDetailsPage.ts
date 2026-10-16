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

  async verifyProductDetails(
    productName: string,
    productPrice: string,
    productImage: string
  ) {
    await expect(
      this.productNameonDetailspage,
      "Product name on the details page does not match the expected product name"
    ).toHaveText(productName);
    await expect(
      this.priceonpdp,
      "Product price on the details page does not match the expected product price"
    ).toHaveText(productPrice);
    await expect(
      this.imageonpdp,
      "Product image source does not match the expected image"
    ).toHaveAttribute("src", productImage);
    await expect(
      this.descriptiononpdp,
      "Product description should not be empty"
    ).not.toBeEmpty();
    await expect(
      this.addtoCartvisible,
      "Add to Cart button should be visible"
    ).toBeVisible();
    await expect(
      this.addtoCartvisible,
      "Add to Cart button should be enabled"
    ).toBeEnabled();
  }

  async verifyRemovebutton(): Promise<void> {
    await expect(this.addtoCartvisible).toBeVisible();
    await expect(this.cartBadge).not.toBeVisible();

    await this.addtoCartvisible.click();
    await expect(this.removeButton).toBeVisible();

    await expect(this.cartBadge).toHaveText("1");
    await this.removeButton.click();
    await expect(this.addtoCartvisible).toBeVisible();
    await expect(this.cartBadge).not.toBeVisible();
  }

  async verifyBacktoProductsNavigation(): Promise<void> {
    await this.backtoproductNaviagtion.click();
    await expect(this.page).toHaveURL(/inventory\.html/);
  }
}
