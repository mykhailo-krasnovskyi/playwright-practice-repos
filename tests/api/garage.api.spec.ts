import test, { expect } from "@playwright/test";
import { credentials } from "../../test-data/usersData";


test.describe(('Garage tests'), () => {
    let globalAuthHeader: string;
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

        for (const car of carsToAdd) {
            const responseAddCar = await request.post('/api/cars', {
                data: car,
                headers: {
                    'Cookie': globalAuthHeader
                }
            });
            const responseAddCarJson = await responseAddCar.json();
            addedCarsIds.push(responseAddCarJson.data.id);

        }

        console.log(addedCarsIds);
    })

    test('Edit an existing car - change mileage[/api/cars{id} ]', async ({ request }) => {
        const newCar = {
            "mileage": 99999
        }
        const responseChangeCar = await request.put(`/api/cars/${addedCarsIds[0]}`, {
            data: newCar,
            headers: {
                'Cookie': globalAuthHeader
            }
        });
        const responseChangeCarJson = await responseChangeCar.json();

        expect(responseChangeCarJson.data.id).toBe(addedCarsIds[0]);
        expect(responseChangeCarJson.data.mileage).toBe(99999);
    });

    test('Add a car - BMW X5 [/api/cars]', async ({ request }) => {
        const newCar = {
            "carBrandId": 2,
            "carModelId": 8,
            "mileage": 168223
        }
        const responseAddCar = await request.post(`/api/cars`, {
            data: newCar,
            headers: {
                'Cookie': globalAuthHeader
            }
        });
        const responseAddCarJson = await responseAddCar.json();
        expect(responseAddCarJson.data.brand).toBe('BMW');
        expect(responseAddCarJson.data.carModelId).toBe(newCar.carModelId);
        expect(responseAddCarJson.data.id).toBeDefined();
    });

    test('Add a car - Ford Fiesta [/api/cars]', async ({ request }) => {
        const newCar = {
            "carBrandId": 3,
            "carModelId": 11,
            "mileage": 168223
        }
        const responseAddCar = await request.post(`/api/cars`, {
            data: newCar,
            headers: {
                'Cookie': globalAuthHeader
            }
        });
        const responseAddCarJson = await responseAddCar.json();
        expect(responseAddCarJson.data.brand).toBe('Ford');
        expect(responseAddCarJson.data.carModelId).toBe(newCar.carModelId);
        expect(responseAddCarJson.data.id).toBeDefined();
    });

    test.afterAll(async ({ request }) => {
        const responseGetCars = await request.get('/api/cars', {
            headers: {
                'Cookie': globalAuthHeader
            }

        });
        const responseGetCarsJson = await responseGetCars.json();
        const cars = responseGetCarsJson.data;

        for (const car of cars) {
            const responseRemoveCar = await request.delete(`/api/cars/${car.id}`, {
                headers: {
                    'Cookie': globalAuthHeader
                }
            });

            const responseRemoveCarJson = await responseRemoveCar.json();
            expect(responseRemoveCarJson.data.carId).toBe(car.id);
        }
    })

})