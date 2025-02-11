import test from "@playwright/test";
import CarsController from "../../api-controllers/CarsController";
import AuthController from "../../api-controllers/AuthController";
import { credentials } from "../../test-data/usersData";

test.describe('Preconditions for adding needed cars', () => {
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



    test('Create a car', async () => {
        const createCarRequest = await carsController.addCar(1, 2, 111, globalAuthHeader);
        console.log(await createCarRequest)
    })
})

