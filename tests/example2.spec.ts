import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  // const email = `michael.krasnovskyi+${Date.now()}@gmail.com`
  // const phone = `+38099${(Date.now()).toString().split()}`
})

test.describe('Base tests', () => {
  test('has title', async ({ page }) => {
    //await page.goto('https://playwright.dev/');
    console.log(Date.now());
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('get started link', async ({ page }) => {
    //await page.goto('https://playwright.dev/');

    // Click the get started link.
    await page.getByRole('link', { name: 'Get started' }).click();

    // Expects page to have a heading with the name of Installation.
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  });
})


