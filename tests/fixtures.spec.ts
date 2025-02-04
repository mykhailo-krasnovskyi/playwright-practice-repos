// import { test } from '../test-data/fixutres/fixtureBase';
import { test } from '../test-data/fixtures/index';
test.describe('Garage Page with Fixtures', () => {

    test.only('Add BMW X6', async ({ garagePageAsLoggedMainUserWithRemovingLastCar, pageSmall }) => {
        test.step('Add [BMW X6] Car to Garage', async () => {
            await garagePageAsLoggedMainUserWithRemovingLastCar.addCarByBrandAndModel('BMW', 'X6', '500');
        })
        test.step('Verify [BMW X6] is in Garage', async () => {
            await garagePageAsLoggedMainUserWithRemovingLastCar.verifyLastAddedCar('BMW X6');
        })
    });

    test.only('@C2 Add Audi TT', async ({ garagePageAsLoggedMainUserWithRemovingLastCar, pageBig }) => {
        await garagePageAsLoggedMainUserWithRemovingLastCar.addCarByBrandAndModel('Audi', 'TT', '500');
        await garagePageAsLoggedMainUserWithRemovingLastCar.verifyLastAddedCar('Audi TT');
    });

    test.only('@C1Add Ford Fiesta', async ({ garagePageAsLoggedMainUserWithRemovingLastCar, pageMedium }) => {
        await garagePageAsLoggedMainUserWithRemovingLastCar.addCarByBrandAndModel('Ford', 'Fiesta', '500');
        await garagePageAsLoggedMainUserWithRemovingLastCar.verifyLastAddedCar('Ford Fiesta');
    });

})

test.describe('Test fixtures', () => {
    test('Open wiki 1', async ({ pageSmall }) => {
        await pageSmall.goto('https://www.wikipedia.org/');
        await pageSmall.waitForTimeout(3000);

    })
    test('Open wiki 2', async ({ pageMedium }) => {
        await pageMedium.goto('https://www.wikipedia.org/');
        await pageMedium.waitForTimeout(3000);

    })
    test('Open wiki 3', async ({ pageBig }) => {
        await pageBig.goto('https://www.wikipedia.org/');
        await pageBig.waitForTimeout(3000);

    })
})
