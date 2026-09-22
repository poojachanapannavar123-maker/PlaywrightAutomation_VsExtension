import { CategoryPage } from "./categoryPage";
import { LoginPage } from "./loginPage";
import { Page } from "@playwright/test";
import { ProductDetailsPage } from "./productDetailsPage";

export class PageObjectManager {
  page: Page;
  loginPage: LoginPage;
  categoryPage: CategoryPage;
  productDetailsPage: ProductDetailsPage;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.categoryPage = new CategoryPage(this.page);
    this.productDetailsPage = new ProductDetailsPage(this.page);
  }

  async getLoginPage() {
    return this.loginPage;
  }

  async getCategoryPage() {
    return this.categoryPage;
  }

  async getProductDetailsPage() {
    return this.productDetailsPage;
  }
}
