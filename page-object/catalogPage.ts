import { Page, Locator, expect } from "@playwright/test";

export class CatalogPage {
  private readonly page: Page;
  private readonly catalogLink: Locator;
  private readonly greyJacketLink: Locator;
  private readonly brownShadesLink: Locator;
  private readonly addToCartButton: Locator;
  private readonly greyJacketPrice: Locator;
  private readonly searchField: Locator;
  private readonly searchButton: Locator;
  private readonly bronzeSandalsLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.catalogLink = page.getByRole("link", { name: "Catalog" });
    this.greyJacketLink = page.getByRole("link", { name: /Grey jacket/ });
    this.brownShadesLink = page.getByRole("link", { name: /Brown Shades/ });
    this.addToCartButton = page.locator("#add");
    this.greyJacketPrice = page.locator("#product-price .product-price");
    this.searchField = page.getByPlaceholder("Search");
    this.searchButton = page.getByRole("button", { name: "Submit" });
    this.bronzeSandalsLink = page.getByRole("link", { name: /Bronze sandals/ });
  }

  async goToCatalog() {
    await this.catalogLink.click();
    await expect(this.page).toHaveURL("/collections/all");
  }

  async openGreyJacket() {
    await this.greyJacketLink.scrollIntoViewIfNeeded();
    await this.greyJacketLink.click();
    await expect(
      this.page.getByRole("heading", { name: "Grey jacket" }),
    ).toBeVisible();
  }

  async getGreyJacketPrice() {
    await expect(this.greyJacketPrice).toBeVisible();
    return (await this.greyJacketPrice.innerText()).trim();
  }

  async expectGreyJacketPrice(price: string) {
    await expect(this.greyJacketPrice).toHaveText(price);
  }

  async expectAddToCartButtonVisible() {
    await expect(this.addToCartButton).toBeVisible();
  }

  async openBrownShades() {
    await this.brownShadesLink.scrollIntoViewIfNeeded();
    await this.brownShadesLink.click();
    await expect(
      this.page.getByRole("heading", { name: "Brown Shades" }),
    ).toBeVisible();
  }

  async expectSoldOutLabelVisible() {
    await expect(this.addToCartButton).toHaveValue("Sold Out");
  }

  async expectProductCannotBeAddedToCart() {
    await expect(this.addToCartButton).toBeDisabled();
  }

  async addProductToCart() {
    await this.expectAddToCartButtonVisible();
    await Promise.all([
      this.page.waitForResponse(
        (response) =>
          response.url().includes("/cart/add") && response.status() < 400,
      ),
      this.addToCartButton.click(),
    ]);
  }

  async addGreyJacketToCart() {
    await this.goToCatalog();
    await this.openGreyJacket();
    await this.addProductToCart();
  }

  async searchBronzeSandals() {
    await this.searchField.fill("Bronze sandals");
    await this.searchButton.click();
    await expect(this.page).toHaveURL(/\/search/);
    await expect(this.bronzeSandalsLink).toBeVisible();
  }
}
