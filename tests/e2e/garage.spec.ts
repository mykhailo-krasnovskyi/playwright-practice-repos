import { test, expect, Page, chromium } from '@playwright/test';
import HomePage from '../../pom/pages/HomePage';
import SignInForm from '../../pom/forms/SignInForm';
import GaragePage from '../../pom/pages/GaragePage';
import { credentials } from '../../test-data/usersData';

test.describe('Garage Page', () => {
    test.use({ storageState: './test-data/states/userOneState.json' });

    let homePage: HomePage;
    let signInForm: SignInForm;
    let garagePage: GaragePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        signInForm = new SignInForm(page);
        garagePage = new GaragePage(page);

        await garagePage.open();
    })
    
    test('Add BMW X6', async () => {
        test.step('Add [BMW X6] Car to Garage', async () => {
            await garagePage.addCarByBrandAndModel('BMW', 'X6', '500');
        })

        test.step('Verify [BMW X6] is in Garage', async () => {
            await garagePage.verifyLastAddedCar('BMW X6');
        })
    });

    test.only('@C2 Add Audi TT', async () => {
        await garagePage.addCarByBrandAndModel('Audi', 'TT', '500');
        await garagePage.verifyLastAddedCar('Audi TT');
    });

    test.only('@C1Add Ford Fiesta', async () => {
        await garagePage.addCarByBrandAndModel('Ford', 'Fiesta', '500');
        await garagePage.verifyLastAddedCar('Ford Fiesta');
    });

    test.afterEach(async () => {
        await garagePage.removeLastAddedCar();
    })
})


