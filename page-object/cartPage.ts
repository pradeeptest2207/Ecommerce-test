import { Page, Locator, expect } from "@playwright/test";

export class CartPage {
  private readonly page: Page;
  private readonly checkoutLink: Locator;
  private readonly greyJacketProduct: Locator;
  private readonly greyJacketCartItem: Locator;
  private readonly removeGreyJacketLink: Locator;
  private readonly emptyCartMessage: Locator;
  private readonly emptyCartHeaderLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutLink = page.getByRole("link", { name: "Check Out" });
    this.greyJacketProduct = page
      .getByRole("link", { name: /Grey jacket/ })
      .first();
    this.greyJacketCartItem = this.greyJacketProduct.locator(
      'xpath=ancestor::div[.//a[normalize-space()="x"]][1]',
    );
    this.removeGreyJacketLink = page.getByRole("link", { name: "x" });
    this.emptyCartMessage = page.locator("p", {
      hasText: /cart is currently empty/i,
    });
    this.emptyCartHeaderLink = page.getByRole("link", { name: "My Cart (0)" });
  }

  async goToCart() {
    await this.page.goto("/cart", { waitUntil: "domcontentloaded" });
    await expect(this.page).toHaveURL("/cart");
  }

  async openCartFromHeader() {
    await this.checkoutLink.click();
    await expect(this.page).toHaveURL("/cart");
  }

  async expectGreyJacketInCart() {
    await expect(this.page).toHaveURL("/cart");
    await expect(this.greyJacketProduct).toBeVisible();
  }

  async expectGreyJacketName(productName: string) {
    await expect(this.greyJacketProduct).toContainText(productName);
  }

  async expectGreyJacketPrice(price: string) {
    await expect(this.greyJacketCartItem).toBeVisible();
    await expect(this.greyJacketCartItem.locator(".price").first()).toHaveText(
      price,
    );
  }

  async removeGreyJacketFromCart() {
    await Promise.all([
      this.page.waitForResponse(
        (response) =>
          response.url().includes("/cart/change") && response.status() < 400,
      ),
      this.removeGreyJacketLink.click(),
    ]);
  }

  async expectGreyJacketRemoved() {
    await expect(this.greyJacketProduct).toHaveCount(0);
    await expect(this.emptyCartHeaderLink).toBeVisible();
    await expect(this.emptyCartMessage).toBeVisible();
  }
}
