import { Page, Locator, expect } from "@playwright/test";

export class CartPage {
  page: Page;
  productNameoncartPage: Locator;
  removebuttonvisible: Locator;
  continueshoppingbuttononcart: Locator;
  checkoutoncart: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productNameoncartPage = this.page.locator(
      '.cart_item [data-test="inventory-item-name"]'
    );
    this.removebuttonvisible = this.page.getByRole("button", {
      name: "Remove",
    });

    this.continueshoppingbuttononcart = this.page.getByRole("button", {
      name: "Continue Shopping",
    });

    this.checkoutoncart = this.page.getByRole("button", { name: "Checkout" });
  }

  async verifyCartDetails(productName: string): Promise<void> {
    await expect(this.productNameoncartPage).toHaveText(productName);
    await expect(this.removebuttonvisible).toBeVisible();
    await expect(this.continueshoppingbuttononcart).toBeVisible();
    await expect(this.checkoutoncart).toBeVisible();
  }
}
