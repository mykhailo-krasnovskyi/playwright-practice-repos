import test, { expect } from "@playwright/test";
import { credentials } from "../../test-data/usersData";

test.describe(('Mocking'), () => {

    test('Verify message when no cars added', async ({ page }) => {
        await page.goto('/');
        await page.getByText('Sign In').click();
        const fakeResponseBody = { "status": "ok", "data": [] }
        await page.route('**/api/cars', route => route.abort());
        await page.locator('//input[@id="signinEmail"]').fill('michael.krasnovskyi+testUser1@gmail.com');
        await page.locator('//input[@id="signinPassword"]').fill('ZSgeVQhuU3qkvlG');
        await page.locator('//div[@class="modal-content"]//button[contains(@class, "btn-primary")]').click();
        await expect(page).toHaveURL('https://qauto.forstudy.space/panel/garage');
        await expect(page).toHaveTitle('Hillel Qauto');
        await expect(page.getByText('You don’t have any cars in your garage')).toBeVisible();
    })
})


test.describe(('Request'), () => {

    test.describe(('Public requests'), () => {
        test('Get all brands [/api/cars/brands]', async ({ request }) => {
            const response = await request.get('/api/cars/brands');
            const responseJson = await response.json();
            const responseData = responseJson.data;

            expect(responseData.length).toBe(5);
            expect(responseData[0].title).toBe('Audi');
            expect(responseData[2].title).toBe('Ford');
        });

        test('Sign in [/api/auth/signin]', async ({ request }) => {
            const responseAuth = await request.post('/api/auth/signin', {
                data: {
                    "email": credentials.userOne.email,
                    "password": credentials.userOne.password,
                    "remember": false
                }
            });

            const responseAuthJson = await responseAuth.json();
            console.log(await request.storageState())
            console.log(responseAuthJson);

            const responseCars = await request.get('/api/cars');
            console.log(await responseCars.json());

        });
    })


    test.describe(('Private requests'), () => {
        let globalAuthHeader: string;


        test.beforeAll(async ({ request }) => {
            const responseAuth = await request.post('/api/auth/signin', {
                data: {
                    "email": credentials.userOne.email,
                    "password": credentials.userOne.password,
                    "remember": false
                }
            });
            globalAuthHeader = responseAuth.headers()['set-cookie'].split(';')[0];

            expect(globalAuthHeader).toBeDefined();
        })

        test('Get user cars', async ({ request }) => {
            const responseCars = await request.get('/api/cars', {
                headers: {
                    'Cookie': globalAuthHeader
                }
            });
            console.log(await responseCars.json());
        });
    })
})