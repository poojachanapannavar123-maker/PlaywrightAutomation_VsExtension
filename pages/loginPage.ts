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

  /**
   * Navigate to the application base url
   * @returns Promise that resolves when the navigation completes
   * @author Pooja
   */
  async goTo() {
    await this.page.goto("/");
  }

  /**
   * Logs in to the application using valid username and password and verifies successful navigation
   * @param userName
   * @param password
   * @returns A promise that resolves when the login assertion passed
   * @author Pooja
   */
  async validLoginMethod(userName: string, password: string) {
    await this.username.fill(userName);
    await this.password.fill(password);
    await this.login.click();
    await expect(this.page).toHaveURL(/inventory\.html/);
    await expect(this.productList).toBeVisible();
  }

  /**
   * Attempt to login with invalid username and password and verifies the error message
   * @param userName
   * @param password
   * @returns A Promose that resolves when the error assertion passes
   * @author Pooja
   */
  async invalidLoginMethod(userName: string, password: string) {
    await this.username.fill(userName);
    await this.password.fill(password);
    await this.login.click();
    await expect(this.invalidError).toContainText(
      "Epic sadface: Username and password do not match any user in this service"
    );
  }

  /**
   * Attempt to login with locked username and password and verifies the error message
   * @param userName
   * @param password
   * @returns A promise that resolves when the error assertion passes
   * @author Pooja
   */
  async lockedoutUserMethod(userName: string, password: string) {
    await this.username.fill(userName);
    await this.password.fill(password);
    await this.login.click();
    await expect(this.invalidError).toContainText(
      "Epic sadface: Sorry, this user has been locked out."
    );
  }
}
