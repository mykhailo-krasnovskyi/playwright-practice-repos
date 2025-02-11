import test, { expect } from "@playwright/test";
import { credentials } from "../../test-data/usersData";
import AuthController from "../../api-controllers/AuthController";
import CarsController from "../../api-controllers/CarsController";

test.describe(('Garage tests'), () => {
    let authController: AuthController;
    let globalAuthHeader;
    let carsController: CarsController;
    let addedCarsIds: any[] = [];
    let carsToAdd = [{
        "carBrandId": 1,
        "carModelId": 1,
        "mileage": 122
    },
    {
        "carBrandId": 2,
        "carModelId": 6,
        "mileage": 555
    }]

    test.beforeEach(async ({ request }) => {
        authController = new AuthController(request);
        carsController = new CarsController(request);
    })

    test.beforeAll(async ({ request }) => {
        carsController = new CarsController(request);
        authController = new AuthController(request);
        globalAuthHeader = await authController.signInAndGetCookie(credentials.userOne.email, credentials.userOne.password);
        expect(globalAuthHeader).toBeDefined();

        for (const car of carsToAdd) {
            const responseAddCar = await carsController.addCar(car.carBrandId, car.carModelId, car.mileage, globalAuthHeader);
            addedCarsIds.push(responseAddCar.data.id);
        }
    })

    test('Edit an existing car - change mileage[/api/cars{id} ]', async () => {
        const newCar = {
            "mileage": 99999
        }
        const responseChangeCar = await carsController.editCar(addedCarsIds[0], globalAuthHeader, undefined, undefined, newCar.mileage
        )

        expect(responseChangeCar.data.id).toBe(addedCarsIds[0]);
        expect(responseChangeCar.data.mileage).toBe(99999);
    });

    test('Add a car - BMW X5 [/api/cars]', async () => {
        const newCar = {
            "carBrandId": 2,
            "carModelId": 8,
            "mileage": 168223
        }
        const responseAddCar = await carsController.addCar(newCar.carBrandId, newCar.carModelId, newCar.mileage, globalAuthHeader);
        expect(responseAddCar.data.brand).toBe('BMW');
        expect(responseAddCar.data.carModelId).toBe(newCar.carModelId);
        expect(responseAddCar.data.id).toBeDefined();
    });

    test('Add a car - Ford Fiesta [/api/cars]', async () => {
        const newCar = {
            "carBrandId": 3,
            "carModelId": 11,
            "mileage": 168223
        }
        const responseAddCar = await carsController.addCar(newCar.carBrandId, newCar.carModelId, newCar.mileage, globalAuthHeader);
        expect(responseAddCar.data.brand).toBe('Ford');
        expect(responseAddCar.data.carModelId).toBe(newCar.carModelId);
        expect(responseAddCar.data.id).toBeDefined();
    });

    test.afterAll(async ({ request }) => {
        // carsController = new CarsController(request);

        // const cars = await carsController.getUserCars(globalAuthHeader);
        // await carsController.removeCars(cars, globalAuthHeader);
    })

})