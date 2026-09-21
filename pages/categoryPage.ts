import { Locator, Page, expect } from "@playwright/test";

export class CategoryPage {
  page: Page;
  productList: Locator;
  productText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productList = page.locator(".inventory_item");
    this.productText = page.locator(".inventory_item_name ");
  }

  async searchProduct(productName: string) {
    const titles = await this.page
      .locator(".inventory_item_name ")
      .allTextContents();
    console.log(titles);

    const count = await this.productList.count();
    for (let i = 0; i < count; i++) {
      const product = this.productList.nth(i);

      const productText = await product
        .locator(".inventory_item_name ")
        .textContent();

      if (productText?.trim() === productName) {
        await product.locator(".inventory_item_name ").click();
        break;
      }
    }
  }
}
