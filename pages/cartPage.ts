import { Page, Locator, expect } from "@playwright/test";

export class CartPage {
  page: Page;
  productNameoncartPage: Locator;
  removebuttonvisible: Locator;
  continueshoppingbuttononcart: Locator;
  checkoutoncart: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productNameoncartPage = page.locator(
      '.cart_item [data-test="inventory-item-name"]'
    );
    this.removebuttonvisible = page.getByRole("button", {
      name: "Remove",
    });

    this.continueshoppingbuttononcart = page.getByRole("button", {
      name: "Continue Shopping",
    });

    this.checkoutoncart = this.page.getByRole("button", { name: "Checkout" });
  }

  /**
   * Verifies the product name on the cart page and visibility of the cart page buttons
   * @param productName
   * @returns A promise that resolves when all cart detail assertion passes
   * @author Pooja
   */
  async verifyCartDetails(productName: string): Promise<void> {
    await expect(this.productNameoncartPage).toHaveText(productName);
    await expect(this.removebuttonvisible).toBeVisible();
    await expect(this.continueshoppingbuttononcart).toBeVisible();
    await expect(this.checkoutoncart).toBeVisible();
  }
}
