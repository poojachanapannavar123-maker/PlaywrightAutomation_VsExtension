import { Locator, Page, expect } from "@playwright/test";
import { getRandomIndex } from "../utils/helper";

export class ProductsPage {
  page: Page;
  product: Locator;
  productText: Locator;
  addToCart: Locator;
  cartIcon: Locator;
  cartBadge: Locator;
  productListContainer: Locator;

  readonly productNameLocator = '//*[contains(text(),"PRODUCT_NAME")]';

  constructor(page: Page) {
    this.page = page;
    this.product = page.locator(".inventory_item");
    this.productListContainer = page.locator(
      '[data-test="inventory-container"]'
    );
    this.productText = page.locator(".inventory_item_name ");
    this.cartIcon = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  }

  getProductLocator(productName: string): Locator {
    const locator = this.productNameLocator.replace(
      "PRODUCT_NAME",
      productName
    );
    return this.page.locator(locator);
  }

  /**
   * click the product name using parameterized locator
   * @param productName
   * @return Promise will resolves once after the respective productname clicked
   * @author Pooja
   */
  async clickProductName(productName: string): Promise<void> {
    await this.getProductLocator(productName).click();
  }

  async verifyproductListVisible(expectedCount: number): Promise<void> {
    await expect(this.productListContainer).toBeVisible();
    await expect(this.product).toHaveCount(expectedCount);
  }
  async randomlypickedproduct(): Promise<{
    productName: string;
    productPrice: string;
    productImage: string;
  }> {
    const count: number = await this.product.count();
    const randomIndex: number = getRandomIndex(count);
    const selectedproduct = this.product.nth(randomIndex);
    const productName = await selectedproduct
      .locator('[data-test="inventory-item-name"]')
      .innerText();
    const productPrice = await selectedproduct
      .locator('[data-test="inventory-item-price"]')
      .innerText();
    console.log("Listing price:", productPrice);
    const productImage = await selectedproduct
      .locator(".inventory_item_img img")
      .getAttribute("src");
    await selectedproduct.locator('[data-test$="-title-link"]').click();
    await expect(this.page).toHaveURL(/inventory-item\.html/);
    return { productName, productPrice, productImage: productImage ?? "" };
  }

  async goToCart(): Promise<void> {
    await this.cartIcon.click();
  }

  async addToCartMethod(): Promise<string> {
    const count: number = await this.product.count();
    const availableProductsIndexes: number[] = [];

    for (let i = 0; i < count; i++) {
      const selectedProduct = this.product.nth(i);
      const addButton = selectedProduct.getByRole("button", {
        name: "Add to cart",
      });

      if (await addButton.isVisible()) {
        availableProductsIndexes.push(i);
      }
    }

    if (availableProductsIndexes.length === 0) {
      throw new Error("No products left to add to cart");
    }

    const randomIndex = getRandomIndex(availableProductsIndexes.length);
    const selectedProduct = this.product.nth(
      availableProductsIndexes[randomIndex]
    );

    const productName = await selectedProduct
      .locator('[data-test="inventory-item-name"]')
      .innerText();

    await selectedProduct
      .getByRole("button", {
        name: "Add to cart",
      })
      .click();

    return productName;
  }

  async verifyCartBadge(count: string): Promise<void> {
    await expect(this.cartBadge).toHaveText(count);
  }

  async filteredProduct(productkeyword: string): Promise<void> {
    const matchingProduct = this.product.filter({
      hasText: productkeyword,
    });
    await expect(matchingProduct).toBeVisible();
  }
}
