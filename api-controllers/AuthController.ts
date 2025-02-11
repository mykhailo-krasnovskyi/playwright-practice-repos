export default class AuthController {

    private request;

    constructor(request) {
        this.request = request;
    }

    async signInAndGetCookie(email: string, password: string) {
        const responseAuth = await this.request.post('/api/auth/signin', {
            data: {
                "email": email,
                "password": password,
                "remember": false
            }
        });
        return responseAuth.headers()['set-cookie'].split(';')[0];


    }


}