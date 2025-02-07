import { test as base } from '@playwright/test';
import GaragePage from '../../pom/pages/GaragePage';
import HomePage from '../../pom/pages/HomePage';
import SignInForm from '../../pom/forms/SignInForm';
import { credentials } from '../usersData';

type fixturePages = {
    garagePage: GaragePage;
    garagePageAsLoggedMainUser: GaragePage;
    garagePageAsLoggedMainUserWithRemovingLastCar: GaragePage;

}

let homePage: HomePage;
let signInForm: SignInForm;
let garagePage: GaragePage;

export const test = base.extend<fixturePages>({
    garagePage: async ({ page }, use) => {
        garagePage = new GaragePage(page);
        await garagePage.open();
        await use(garagePage);
    },

    garagePageAsLoggedMainUser: async ({ page }, use) => {
        homePage = new HomePage(page);
        signInForm = new SignInForm(page);
        garagePage = new GaragePage(page);
        await homePage.open();
        await homePage.clickSignInButton();
        await signInForm.loginWithCredentials(credentials.userOne.email, credentials.userOne.password);
        await use(garagePage);
    },

    garagePageAsLoggedMainUserWithRemovingLastCar: async ({ browser }, use) => {

        const context = await browser.newContext({
            storageState: './test-data/states/userOneState.json'
        });
        const page = await context.newPage();

        homePage = new HomePage(page);
        signInForm = new SignInForm(page);
        garagePage = new GaragePage(page);

        // await homePage.open();
        // await homePage.clickSignInButton();
        // await signInForm.loginWithCredentials(credentials.userOne.email, credentials.userOne.password);
        await garagePage.open();
        await use(garagePage);

        await garagePage.removeLastAddedCar();
        await page.close();
    },
})