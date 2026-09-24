import { Page, Locator, expect } from "@playwright/test";
import { CategoryPage } from "./categoryPage";

export class ProductDetailsPage {
  page: Page;
  addtoCartvisible: Locator;
  productNameonDetailspage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productNameonDetailspage = page.locator(
      '.inventory_details [data-test="inventory-item-name"]'
    );
    this.addtoCartvisible = page.getByText("Add to cart");
  }

  async verifyProductDetails(productName: string) {
    await expect(this.productNameonDetailspage).toHaveText(productName);
    await expect(this.addtoCartvisible).toBeVisible();
    await expect(this.addtoCartvisible).toBeEnabled();
  }
}
