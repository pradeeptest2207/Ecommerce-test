# E-commerce QA Automation with Playwright

![Playwright Tests](https://github.com/camillacasti/ecommerce-test-automation/actions/workflows/playwright.yml/badge.svg)

Automated UI test project for the public Sauce Demo Shopify storefront:

https://sauce-demo.myshopify.com

The goal of this project is to demonstrate end-to-end testing practices for common e-commerce flows such as catalog navigation, product search, product details, add to cart, cart validation, item removal and stable login form checks.

## Tech Stack

- Playwright
- TypeScript
- Node.js
- GitHub Actions
- HTML test reports

## Test Strategy

The suite focuses on stable customer-facing flows that can be automated reliably against a public demo website.

Covered areas:

- Login page UI validation
- Catalog navigation
- Product detail validation
- Product search
- Add to cart
- Cart item name and price validation
- Cart item removal
- Sold out product validation
- Cross-browser execution with Chromium, Firefox and WebKit

## Login Scope

Authenticated login tests are intentionally not included in the automated suite.

The Shopify customer login page may trigger CAPTCHA or connection verification on valid and invalid credential attempts. Because this is a public third-party demo site and not a controlled QA environment, those scenarios are not deterministic enough for a reliable portfolio test suite.

Instead, this project validates stable login page behavior:

- Login form is displayed
- Empty form submission remains on the login page

In a real QA environment, authenticated login would usually be handled with one of the following approaches:

- A dedicated test environment without CAPTCHA
- Test users with CAPTCHA bypass configured by the team
- API-based authentication setup
- Reusable Playwright `storageState`
- Backend/session fixtures controlled by the project

## Test Coverage

### Login

- Verifies that the login form fields and sign-in button are visible.
- Verifies that submitting empty fields keeps the user on the login page.

### Catalog

- Navigates to the catalog page.
- Opens the Grey jacket product detail page.
- Validates Grey jacket price and add to cart button visibility.
- Adds Grey jacket to the cart.
- Searches for Bronze sandals and validates the product link is visible.
- Opens a sold out product and verifies it cannot be added to the cart.

### Cart

- Opens the cart from the site header.
- Adds Grey jacket to the cart and verifies it appears.
- Validates that the cart item name matches the added product.
- Validates that the cart item price matches the expected product price.
- Removes Grey jacket from the cart.
- Verifies the cart is empty after item removal.

## Project Structure

```text
ecommerce-test-automation/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── page-object/
│   ├── cartPage.ts
│   ├── catalogPage.ts
│   ├── loginPage.ts
│   └── pageObjectManager.ts
├── tests/
│   ├── cartPage.spec.ts
│   ├── catalogPage.spec.ts
│   └── loginPage.spec.ts
├── playwright.config.ts
├── package.json
├── package-lock.json
└── README.md
```

## Installation

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

## Running Tests

Run the full test suite:

```bash
npm test
```

Run tests in UI mode:

```bash
npm run test:ui
```

Run tests in headed mode:

```bash
npm run test:headed
```

Open the HTML report:

```bash
npm run report
```

Run a specific spec file:

```bash
npx playwright test tests/cartPage.spec.ts
```

Run tests in a specific browser:

```bash
npx playwright test --project=chromium
```

## Quality Checks

This project uses Prettier to keep a consistent code style.

Check code formatting:

```bash
npm run format:check
```

Format the code:

```bash
npm run format
```

## Configuration

The Playwright configuration is located in `playwright.config.ts`.

Current configuration includes:

- Base URL: `https://sauce-demo.myshopify.com`
- HTML reporter
- Trace collection on first retry
- Cross-browser projects:
  - Chromium
  - Firefox
  - WebKit
- CI retries
- GitHub Actions workflow for automated test execution

## CI

GitHub Actions workflow is configured in:

```text
.github/workflows/playwright.yml
```

The workflow runs on push and pull request events for `main` and `master`.

It performs the following steps:

- Checks out the repository
- Sets up Node.js
- Installs dependencies with `npm ci`
- Checks code formatting with `npm run format:check`
- Installs Playwright browsers
- Runs the Playwright test suite
- Uploads the Playwright HTML report as an artifact

After each CI run, the Playwright HTML report is uploaded as a GitHub Actions artifact.

## Known Limitations

This project tests a public demo storefront, not a private QA environment. Because of that, a few limitations are expected:

- The site can occasionally show connection verification or CAPTCHA.
- Product data can change because the application is externally owned.
- Checkout and payment are not automated because they require real checkout/payment details.
- Authenticated login with valid or invalid credentials is excluded for reliability reasons.
- API testing is not included because the public Shopify demo storefront does not provide controlled API endpoints or test credentials for reliable automation.

These limitations are documented intentionally to keep the automated suite focused on stable, repeatable test scenarios.

## Notes

The project follows the Page Object Model pattern to keep test files readable and separate page interactions from test assertions.

The main goal is to demonstrate practical QA automation judgement: clear test coverage, stable assertions, reusable page objects and awareness of the limits of testing against a public third-party application.
