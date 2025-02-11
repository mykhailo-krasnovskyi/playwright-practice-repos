import { expect } from "@playwright/test";

export default class CarsController {

    private request;

    constructor(request) {
        this.request = request;
    }

    async addCar(carBrandId: number, carModelId: number, mileage: number, token: string) {
        const responseAddCar = await this.request.post(`/api/cars`, {
            data: {
                carBrandId,
                carModelId,
                mileage
            },
            headers: {
                'Cookie': token
            }
        });
        return await responseAddCar.json();
    }

    async editCar(carId: number, token: string, carBrandId?: number, carModelId?: number, mileage?: number,) {
        const responseEditCar = await this.request.put(`/api/cars/${carId}`, {
            data: {
                carBrandId,
                carModelId,
                mileage
            },
            headers: {
                'Cookie': token
            }
        });
        return await responseEditCar.json();
    }

    async getUserCars(token: string) {
        const responseGetCars = await this.request.get('/api/cars', {
            headers: {
                'Cookie': token
            }

        });
        const responseGetCarsJson = await responseGetCars.json();
        return responseGetCarsJson.data;

    }

    async removeCars(cars, token: string) {
        for (const car of cars) {
            const responseRemoveCar = await this.request.delete(`/api/cars/${car.id}`, {
                headers: {
                    'Cookie': token
                }
            });

            const responseRemoveCarJson = await responseRemoveCar.json();
            expect(responseRemoveCarJson.data.carId).toBe(car.id);
        }
    }
}
