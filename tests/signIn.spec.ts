import { test, expect } from '@playwright/test';
import HomePage from '../pom/pages/HomePage';
import SignInForm from '../pom/forms/SignInForm';
import { credentials } from '../test-data/usersData';

test.describe.only('Sign In Form POM', () => {
    let homePage: HomePage;
    let signInForm: SignInForm;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        signInForm = new SignInForm(page);

        await homePage.open();
        await homePage.clickSignInButton();
    })

    test('Sign in without email', async () => {
        await signInForm.triggerErrorOnField('email');
        await signInForm.verifyErrorMessageByText('Email required');
    });

    test('Sign in without password', async () => {
        await signInForm.triggerErrorOnField('password');
        await signInForm.verifyErrorMessageByText('Password required');
    });

    test('Sign in with invalid email', async () => {
        await signInForm.enterEmail('test@test');
        await signInForm.triggerErrorOnField('email');
        await signInForm.verifyErrorMessageByText('Email is incorrect');
    });

    test('Sign in with incorrect credentials', async () => {
        await signInForm.loginWithCredentials('test@test.test', '12312424fs3');
        await signInForm.verifyWrongDataMessage();
    });

    test('Sign in with correct credentials', async ({ page }) => {
        await signInForm.loginWithCredentials(credentials.randomUser.email, credentials.userOne.password);

        await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage');
        await expect(page).toHaveTitle('Hillel Qauto');
        // await expect(page.locator('//app-garage')).toHaveScreenshot('Garage-one-car.png');
        //   await expect(page).toHaveScreenshot('Garage-full-page.png');

    });
})



test.describe('Sign In Form', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.getByText('Sign In').click();
    })


    test('Sign in without email', async ({ page }) => {
        await page.locator('//input[@id="signinEmail"]').focus();
        await page.locator('//input[@id="signinEmail"]').blur();
        await expect(page.locator('//div[@class="invalid-feedback"]//p')).toHaveText('Email required');
    });

    test('Sign in without password', async ({ page }) => {
        await page.locator('//input[@id="signinPassword"]').focus();
        await page.locator('//input[@id="signinPassword"]').blur();
        await expect(page.locator('//div[@class="invalid-feedback"]//p')).toHaveText('Password required');
    });

    test('Sign in with invalid email', async ({ page }) => {
        await page.locator('//input[@id="signinEmail"]').fill('test@test');
        await page.locator('//input[@id="signinEmail"]').blur();
        await expect(page.locator('//div[@class="invalid-feedback"]//p'), 'Email should not be valid').toHaveText('Email is incorrect');
    });

    test('Sign in with incorrect credentials', async ({ page }) => {
        await page.locator('//input[@id="signinEmail"]').fill('test@gmail.com');
        await page.locator('//input[@id="signinPassword"]').fill('1421421412');
        await page.locator('//div[@class="modal-content"]//button[contains(@class, "btn-primary")]').click();
        await expect(page.locator('//p[contains(@class, "alert-danger")]')).toHaveText('Wrong email or password');
    });

    test('Sign in with correct credentials', async ({ page }) => {
        await page.locator('//input[@id="signinEmail"]').fill('michael.krasnovskyi+testUser1@gmail.com');
        await page.locator('//input[@id="signinPassword"]').fill('ZSgeVQhuU3qkvlG');
        await page.locator('//div[@class="modal-content"]//button[contains(@class, "btn-primary")]').click();

        await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage');
        await expect(page).toHaveTitle('Hillel Qauto');
        // await expect(page.locator('//app-garage')).toHaveScreenshot('Garage-one-car.png');
        await expect(page).toHaveScreenshot('Garage-full-page.png');

    });
})


