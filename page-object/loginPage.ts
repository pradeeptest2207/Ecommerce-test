import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
  private readonly page: Page;
  private readonly emailField: Locator;
  private readonly passwordField: Locator;
  private readonly signInButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailField = page.locator("#customer_email");
    this.passwordField = page.locator("#customer_password");
    this.signInButton = page.locator('input[value="Sign In"]');
  }

  async expectLoginFormVisible() {
    await expect(this.emailField).toBeVisible();
    await expect(this.passwordField).toBeVisible();
    await expect(this.signInButton).toBeVisible();
  }

  async submitWithEmptyFields() {
    await this.signInButton.click();
    await expect(this.page).toHaveURL(/\/account\/login/);
    await this.expectLoginFormVisible();
  }
}
