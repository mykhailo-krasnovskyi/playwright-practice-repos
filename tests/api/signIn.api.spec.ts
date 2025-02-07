import test, { expect } from "@playwright/test";
import { credentials } from "../../test-data/usersData";


test.describe(('SignIn tests'), () => {

    test('Successful sign in with correct email and password [/auth/signin]', async ({ request }) => {
        const correctUser = {
            "email": credentials.userOne.email,
            "password": credentials.userOne.password,
            "remember": false
        }

        const responseAuth = await request.post('/api/auth/signin', {
            data: correctUser
        });

        const responseAuthJson = await responseAuth.json();

        expect(responseAuthJson.status).toBe('ok');
        expect(responseAuthJson.data.userId).toBeDefined();

    });

    test('Sign in without email - verify error message [/auth/signin]', async ({ request }) => {
        const correctUser = {
            "password": credentials.userOne.password,
            "remember": false
        }

        const responseAuth = await request.post('/api/auth/signin', {
            data: correctUser
        });

        const responseAuthJson = await responseAuth.json();

        expect(responseAuthJson.status).toBe('error');
        expect(responseAuthJson.message).toBe('Email is required');
    });

    test('Sign in without password - verify error message [/auth/signin]', async ({ request }) => {
        const correctUser = {
            "email": credentials.userOne.email,
            "remember": false
        }

        const responseAuth = await request.post('/api/auth/signin', {
            data: correctUser
        });

        const responseAuthJson = await responseAuth.json();

        expect(responseAuthJson.status).toBe('error');
        expect(responseAuthJson.message).toBe('Password is required');
    });

    test('Sign with not correct password - verify error message [/auth/signin]', async ({ request }) => {
        const correctUser = {
            "email": credentials.randomUser.email,
            "password": 'Test29292929',
            "remember": false
        }

        const responseAuth = await request.post('/api/auth/signin', {
            data: correctUser
        });

        const responseAuthJson = await responseAuth.json();

        expect(responseAuthJson.status).toBe('error');
        expect(responseAuthJson.message).toBe('Wrong email or password');
    });
})