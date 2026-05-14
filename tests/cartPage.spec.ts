import { test } from "@playwright/test";
import { PageObjectManager } from "../page-object/pageObjectManager";

test.beforeEach(async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
});

test("open cart from header", async ({ page }) => {
  const pm = new PageObjectManager(page);

  await pm.onCartPage().openCartFromHeader();
});

test("remove grey jacket from cart", async ({ page }) => {
  const pm = new PageObjectManager(page);

  await pm.onCatalogPage().addGreyJacketToCart();
  await pm.onCartPage().goToCart();
  await pm.onCartPage().expectGreyJacketInCart();
  await pm.onCartPage().removeGreyJacketFromCart();
  await pm.onCartPage().expectGreyJacketRemoved();
});

test("grey jacket details match in cart", async ({ page }) => {
  const pm = new PageObjectManager(page);

  await pm.onCatalogPage().addGreyJacketToCart();
  await pm.onCartPage().goToCart();
  await pm.onCartPage().expectGreyJacketInCart();
  await pm.onCartPage().expectGreyJacketName("Grey jacket");
  await pm.onCartPage().expectGreyJacketPrice("£55.00");
});
