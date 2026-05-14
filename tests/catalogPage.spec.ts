import { test } from "@playwright/test";
import { PageObjectManager } from "../page-object/pageObjectManager";

test.beforeEach(async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
});
test("add grey jacket to cart", async ({ page }) => {
  const pm = new PageObjectManager(page);

  await pm.onCatalogPage().addGreyJacketToCart();
  await pm.onCartPage().goToCart();
  await pm.onCartPage().expectGreyJacketInCart();
});
test("grey jacket details are visible", async ({ page }) => {
  const pm = new PageObjectManager(page);

  await pm.onCatalogPage().goToCatalog();
  await pm.onCatalogPage().openGreyJacket();
  await pm.onCatalogPage().expectGreyJacketPrice("£55.00");
  await pm.onCatalogPage().expectAddToCartButtonVisible();
});

test("search bronze sandals", async ({ page }) => {
  const pm = new PageObjectManager(page);

  await pm.onCatalogPage().searchBronzeSandals();
});

test("sold out product cannot be added to cart", async ({ page }) => {
  const pm = new PageObjectManager(page);

  await pm.onCatalogPage().goToCatalog();
  await pm.onCatalogPage().openBrownShades();
  await pm.onCatalogPage().expectSoldOutLabelVisible();
  await pm.onCatalogPage().expectProductCannotBeAddedToCart();
});
