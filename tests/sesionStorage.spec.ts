import { expect, test } from '@playwright/test';


test.describe('Session Storage', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        await page.getByText('Guest log in').click();
    })
    test('Console log session storage', async ({ page }) => {
        // await page.evaluate(() => {
        //     console.log('Hello from browser');
        // })

        const parsedData = await page.evaluate(() => {
            return window.sessionStorage.getItem('guestData');
        })

        console.log(parsedData);
    });

    test('Verify cars number without adding cars', async ({ page }) => {
        const parsedData = await page.evaluate(() => {
            return window.sessionStorage.getItem('guestData') ?? '';
        })

        const cars = JSON.parse(parsedData).cars;

        expect(cars).toHaveLength(0);
    });

    test('Mock session storage', async ({ page }) => {
        const obj = {
            "expenses": [],
            "cars": [
                {
                    "id": 1,
                    "brand": "Audi",
                    "model": "TT",
                    "logo": "audi.png",
                    "initialMileage": 42,
                    "updatedMileageAt": "2025-02-04T18:02:50.273Z",
                    "carCreatedAt": "2025-02-04T18:02:50.273Z",
                    "carBrandId": 1,
                    "carModelId": 1,
                    "mileage": 42
                },
                {
                    "id": 2,
                    "brand": "Porsche",
                    "model": "911",
                    "logo": "porsche.png",
                    "initialMileage": 42,
                    "updatedMileageAt": "2025-02-04T18:02:53.530Z",
                    "carCreatedAt": "2025-02-04T18:02:53.530Z",
                    "carBrandId": 4,
                    "carModelId": 16,
                    "mileage": 42
                },
                {
                    "id": 3,
                    "brand": "Porsche",
                    "model": "911",
                    "logo": "porsche.png",
                    "initialMileage": 444,
                    "updatedMileageAt": "2025-02-04T18:02:58.274Z",
                    "carCreatedAt": "2025-02-04T18:02:58.274Z",
                    "carBrandId": 4,
                    "carModelId": 16,
                    "mileage": 444
                }
            ],
            "nextCarId": 4,
            "nextExpenseId": 1
        };

        await page.evaluate((data) => {
            window.sessionStorage.setItem('guestData', JSON.stringify(data));
        }, obj);
        await page.reload();

        await expect(page.locator('//li[@class="car-item"]')).toHaveCount(3);
    });
})


