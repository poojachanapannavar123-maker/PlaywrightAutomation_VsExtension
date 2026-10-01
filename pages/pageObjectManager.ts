import { ProductsPage } from "./productsPage";
import { LoginPage } from "./loginPage";
import { Page } from "@playwright/test";
import { ProductDetailsPage } from "./productDetailsPage";
import { CartPage } from "./cartPage";

export class PageObjectManager {
  page: Page;
  loginPage: LoginPage;
  categoryPage: ProductsPage;
  productDetailsPage: ProductDetailsPage;
  verifyCartPage: CartPage;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.categoryPage = new ProductsPage(this.page);
    this.productDetailsPage = new ProductDetailsPage(this.page);
    this.verifyCartPage = new CartPage(this.page);
  }

  async getLoginPage() {
    return this.loginPage;
  }

  async getProductsPage() {
    return this.categoryPage;
  }

  async getProductDetailsPage() {
    return this.productDetailsPage;
  }

  async getCartPage() {
    return this.verifyCartPage;
  }
}
