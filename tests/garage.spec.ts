import { test, expect } from '@playwright/test';
import HomePage from '../pom/pages/HomePage';
import SignInForm from '../pom/forms/SignInForm';
import GaragePage from '../pom/pages/GaragePage';
import { credentials } from '../test-data/usersData';

test.describe('Garage Page', () => {
    let homePage: HomePage;
    let signInForm: SignInForm;
    let garagePage: GaragePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        signInForm = new SignInForm(page);
        garagePage = new GaragePage(page);

        await homePage.open();
        await homePage.clickSignInButton();
        await signInForm.loginWithCredentials(credentials.userOne.email, credentials.userOne.password);
    })
    test('Add BMW X6', async () => {
        await garagePage.addCarByBrandAndModel('BMW', 'X6', '500');
        await garagePage.verifyLastAddedCar('BMW X6');
    });

    test('Add Audi TT', async () => {
        await garagePage.addCarByBrandAndModel('Audi', 'TT', '500');
        await garagePage.verifyLastAddedCar('Audi TT');
    });

    test('Add Ford Fiesta', async () => {
        await garagePage.addCarByBrandAndModel('Ford', 'Fiesta', '500');
        await garagePage.verifyLastAddedCar('Ford Fiesta');
    });

    test.afterEach(async () => {
        await garagePage.removeLastAddedCar();
    })
})


