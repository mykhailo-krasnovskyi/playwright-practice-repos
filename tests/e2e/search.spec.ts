import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
})

test.describe('Search', () => {
    test('locator', async ({ page }) => {
        await expect(page.locator('h1')).toBeVisible();
        await expect(page.locator('//h1')).toBeVisible();
    });

    test('getByRole', async ({ page }) => {
        await expect(page.getByRole('heading', { name: 'Do more!' })).toBeVisible();
    });

    test('getByText', async ({ page }) => {
        await page.getByText('Sign In').click();
    });

    test('getByLabel', async ({ page }) => {
        await page.getByText('Sign In').click();
        await page.getByLabel('Email').fill('test');
    });

    test('has', async ({ page }) => {
        await expect(page.locator('//div', { has: page.locator('//a[@routerlinkactive="-active"]') })).toBeVisible();
    });

    test('hasText, hasNotText', async ({ page }) => {
        await expect(page.locator('//button', { hasNotText: 'About' })).toBeVisible();
    });

    test('hasNot', async ({ page }) => {
        await expect(page.locator('//div', { hasNot: page.locator('//a[@routerlinkactive="-active"]') })).toBeVisible();
    });


    test('Multiple elements + Multiple pages/tabs handling', async ({ page, context }) => {
        const icons = page.locator('//a[@class="socials_link"]');
        const iconsCount = await icons.count();
        console.log('iconsCount' + iconsCount);

        // for (let i = 0; i < iconsCount; i++) {
        //     await icons.nth(i).click();
        // }

        // for (const icon of await icons.all()) {
        //     await icon.click();
        // }

        const faceBookPromise = context.waitForEvent('page');
        await icons.first().click();
        const faceBookPage = await faceBookPromise;
        await faceBookPage.waitForLoadState();
        await expect(faceBookPage.getByText('Forgot password?')).toBeVisible();



        const linkedinPromise = context.waitForEvent('page');
        await icons.last().click();
        const linkedinPage = await linkedinPromise;
        await linkedinPage.waitForLoadState();
        await expect(linkedinPage.getByText(' Already on Linkedin?')).toBeVisible();

        await page.bringToFront();
        await page.waitForTimeout(1000);
        await faceBookPage.bringToFront();
        await page.waitForTimeout(1000);
        await linkedinPage.bringToFront();
        await page.waitForTimeout(1000);
    });
})


