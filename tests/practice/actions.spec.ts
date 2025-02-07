import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
})

test.describe('Actions', () => {
    test('fill/pressSeq', async ({ page }) => {
        await page.getByText('Sign In').click();
        await page.locator('//input[@id="signinEmail"]').fill('testEmail');
        await page.locator('//input[@id="signinPassword"]').pressSequentially('testPassword', { delay: 300 });
    });

    test('focus/blur', async ({ page }) => {
        await page.getByText('Sign In').click();
        await page.locator('//input[@id="signinEmail"]').fill('testEmail');
        await page.locator('//input[@id="signinEmail"]').blur();

        await page.locator('//input[@id="signinPassword"]').focus();
        await page.locator('//input[@id="signinPassword"]').blur();

    });


    test('text', async ({ page }) => {
        // const text = await page.locator('//h1').innerText();
        // expect(text).toBe('Do more!');
        // await expect(page.locator('//h1')).toHaveText('Do more!');

        // const elements = page.locator('//*[contains(@class, "header-link")]');
        // console.log(await elements.allInnerTexts());

        console.log(await page.locator('//h1').textContent());
    });
})


