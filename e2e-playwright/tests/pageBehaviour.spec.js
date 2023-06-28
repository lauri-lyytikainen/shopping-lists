const { test, expect } = require("@playwright/test");

test ("Index page has correct heading, links and text", async ({ page }) => {
  const response = await page.goto("/");
  expect(response.status()).toBe(200);
  await expect(page).toHaveTitle("Shared Shopping Lists");
  await expect(page.locator('h1')).toHaveText("Shared Shopping Lists");
  await expect(page.locator('nav ul li a')).toHaveText("Lists");
  await expect(page.locator('nav ul a div div')).toHaveText("Main Page");
  await expect(page.locator('div p')).toHaveText("No shopping lists yet.");
});

test ("Lists page has correct heading, links and text", async ({ page }) => {
  const response = await page.goto("/lists");
  expect(response.status()).toBe(200);
  await expect(page).toHaveTitle("Shared Shopping Lists");
  await expect(page.locator('nav ul li a')).toHaveText("Lists");
  await expect(page.locator('nav ul a div div')).toHaveText("Main Page");
  await expect(page.locator('.uk-card h2')).toHaveText("Add a new Shopping List");
  await expect(page.locator('form div .uk-input')).toBeVisible();
  await expect(page.locator('form input[type=submit]')).toBeVisible();
  await expect(page.locator('div p')).toHaveText("No shopping lists yet.");
});

test ("Adding a new list works", async ({ page }) => {
  await page.goto("/lists");
  const random = Math.floor(Math.random() * 1000);
  const name = `Test List ${random}`;
  await page.locator('input[type=text]').fill(name);
  await page.getByRole('button', {name: 'Add'}).click();
  await expect(page.locator(`td:has-text("${name}")`)).toBeVisible();
});

test ("Adding a new item works", async ({ page }) => {
  await page.goto("/lists");
  const random = Math.floor(Math.random() * 1000);
  const name = `Test List ${random}`;
  await page.locator('input[type=text]').fill(name);
  await page.getByRole('button', {name: 'Add'}).click();
  await page.locator(`text=${name}`).click();
  await page.waitForURL(`**/lists/**`);
  await expect(page.locator('h1')).toHaveText(name);
  const item = `Test Item ${random}`;
  await page.locator('form div .uk-input').fill(item);
  await page.getByRole('button', {name: 'Add'}).click();
  await expect(page.locator(`td:has-text("${item}")`)).toBeVisible();
});

test ("Checking off a list item works", async ({ page }) => {
  await page.goto("/lists");
  const random = Math.floor(Math.random() * 1000);
  const name = `Test List ${random}`;
  await page.locator('input[type=text]').fill(name);
  await page.getByRole('button', {name: 'Add'}).click();
  await page.locator(`text=${name}`).click();
  const item = `Test Item ${random}`;
  await page.locator('form div .uk-input').fill(item);
  await page.getByRole('button', {name: 'Add'}).click();
  // Wait for the element to be visible
  await page.waitForSelector(`td:has-text("${item}")`);
  await page.locator('input:text("Mark collected!")').click();
  // Expect the name to be inside a <del> tag
  await expect(page.locator(`td:has-text("${item}") del`)).toBeVisible();
});

test ("Deleting a list works", async ({ page }) => {
  await page.goto("/lists");
  const random = Math.floor(Math.random() * 1000);
  const name = `Test List ${random}`;
  await page.locator('input[type=text]').fill(name);
  await page.getByRole('button', {name: 'Add'}).click();
  await page.waitForSelector(`text=${name}`);
  const tr = await page.locator(`tr:has-text("${name}")`);
  await tr.locator('input').click();
  await expect(page.locator(`td:has-text("${name}")`)).not.toBeVisible();
});

test ("Statistics work", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('.uk-card ul li')).toHaveText(["Shopping lists: 4", "Shopping list items: 2"]);

});