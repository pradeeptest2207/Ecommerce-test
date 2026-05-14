import { Page } from "@playwright/test";
import { LoginPage } from "./loginPage";
import { CatalogPage } from "./catalogPage";
import { CartPage } from "./cartPage";

export class PageObjectManager {
  private readonly page: Page;

  private readonly loginPage: LoginPage;
  private readonly catalogPage: CatalogPage;
  private readonly cartPage: CartPage;

  constructor(page: Page) {
    this.page = page;

    this.loginPage = new LoginPage(this.page);
    this.catalogPage = new CatalogPage(this.page);
    this.cartPage = new CartPage(this.page);
  }

  onLoginPage() {
    return this.loginPage;
  }
  onCatalogPage() {
    return this.catalogPage;
  }
  onCartPage() {
    return this.cartPage;
  }
}
