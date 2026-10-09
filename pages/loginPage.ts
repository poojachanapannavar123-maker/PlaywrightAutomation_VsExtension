import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
  page: Page;
  username: Locator;
  password: Locator;
  login: Locator;
  productList: Locator;
  invalidError: Locator;

  constructor(page: Page) {
    this.page = page;

    this.username = page.getByPlaceholder("Username");
    this.password = page.getByPlaceholder("Password");

    this.login = page.getByRole("button", { name: "Login" });

    this.productList = page.locator('[data-test = "inventory-container"]');
    this.invalidError = page.getByRole("alert");
  }

  async goTo() {
    await this.page.goto("/");
  }

  async validLoginMethod(userName: string, password: string) {
    await this.username.fill(userName);
    await this.password.fill(password);
    await this.login.click();
    await expect(this.page).toHaveURL(/inventory\.html/);
    await expect(this.productList).toBeVisible();
  }

  async invalidLoginMethod(userName: string, password: string) {
    await this.username.fill(userName);
    await this.password.fill(password);
    await this.login.click();
    await expect(this.invalidError).toContainText(
      "Epic sadface: Username and password do not match any user in this service"
    );
  }

  async lockedoutUserMethod(userName: string, password: string) {
    await this.username.fill(userName);
    await this.password.fill(password);
    await this.login.click();
    await expect(this.invalidError).toContainText(
      "Epic sadface: Sorry, this user has been locked out."
    );
  }
}
