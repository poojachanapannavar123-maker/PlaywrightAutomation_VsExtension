import { Locator, Page, expect } from "@playwright/test";
import { getRandomIndex } from "../utils/helper";

export class ProductsPage {
  page: Page;
  productList: Locator;
  productText: Locator;
  addToCart: Locator;
  cartIcon: Locator;
  cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productList = page.locator(".inventory_item");
    this.productText = page.locator(".inventory_item_name ");
    this.cartIcon = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = this.page.locator('[data-test="shopping-cart-badge"]');
  }

  async randomlypickedproduct(): Promise<string> {
    const count: number = await this.productList.count();
    const randomIndex: number = getRandomIndex(count);
    const selectedproduct = this.productList.nth(randomIndex);
    const productName = await selectedproduct
      .locator('[data-test="inventory-item-name"]')
      .innerText();
    await selectedproduct.locator('[data-test$="-title-link"]').click();
    await expect(this.page).toHaveURL(/inventory-item\.html/);
    return productName;
  }

  async goToCart() {
    await this.cartIcon.click();
  }

  async addToCartMethod() {
    const count: number = await this.productList.count();
    const randomIndex: number = getRandomIndex(count);
    const selectedproduct = this.productList.nth(randomIndex);
    const productName = await selectedproduct
      .locator('[data-test="inventory-item-name"]')
      .innerText();
    this.addToCart = selectedproduct.getByRole("button", {
      name: "Add to cart",
    });
    await this.addToCart.click();
    return productName;
    //  await expect(this.page).toHaveURL(/cart\.html/);
  }

  async verifyCartBadge(count: string): Promise<void> {
    await expect(this.cartBadge).toHaveText(count);
  }
}
