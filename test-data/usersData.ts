import generateRandomEmail from "../utils/generateRandomEmail";

export const credentials = {
    userOne: {
        email: 'michael.krasnovskyi+testUser1@gmail.com',
        password: 'ZSgeVQhuU3qkvlG',
    },
    userTwo: {
        email: 'michael.krasnovskyi+testUser222@gmail.com',
        password: 'ZSgeVQhuU3qkvlG',
    },
    randomUser: {
        email: generateRandomEmail(),
        password: 'ZSgeVQhuU3qkvlG'
    }
}      