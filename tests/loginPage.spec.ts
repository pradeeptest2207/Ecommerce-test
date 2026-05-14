import { test } from "@playwright/test";
import { PageObjectManager } from "../page-object/pageObjectManager";

test.beforeEach(async ({ page }) => {
  await page.goto("/account/login", { waitUntil: "domcontentloaded" });
});

test("login form is displayed", async ({ page }) => {
  const pm = new PageObjectManager(page);

  await pm.onLoginPage().expectLoginFormVisible();
});

test("login with empty fields stays on login page", async ({ page }) => {
  const pm = new PageObjectManager(page);

  await pm.onLoginPage().submitWithEmptyFields();
});
