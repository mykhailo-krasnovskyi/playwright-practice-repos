import test from "@playwright/test";
import CarsController from "../../api-controllers/CarsController";
import AuthController from "../../api-controllers/AuthController";
import { credentials } from "../../test-data/usersData";

test.describe('Preconditions for removing all users cars', () => {
    let authController: AuthController;
    let globalAuthHeader;
    let carsController: CarsController;

    test.beforeAll(async ({ request }) => {
        authController = new AuthController(request);
        globalAuthHeader = await authController.signInAndGetCookie(credentials.userOne.email, credentials.userTwo.password)
    })

    test.beforeEach(({ request }) => {
        authController = new AuthController(request);
        carsController = new CarsController(request);
    })



    test('Remove all cars', async () => {
        const cars = await carsController.getUserCars(globalAuthHeader);
        await carsController.removeCars(cars, globalAuthHeader);
    })
})

