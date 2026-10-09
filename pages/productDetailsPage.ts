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
    await expect(this.productNameonDetailspage).toHaveText(productName);
    await expect(this.priceonpdp).toHaveText(productPrice);
    await expect(this.imageonpdp).toHaveAttribute("src", productImage);
    await expect(this.descriptiononpdp).not.toBeEmpty();
    await expect(this.addtoCartvisible).toBeVisible();
    await expect(this.addtoCartvisible).toBeEnabled();
  }

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

  async verifyBacktoProductsNavigation() {
    await this.backtoproductNaviagtion.click();
    await expect(this.page).toHaveURL(/inventory\.html/);
  }
}
