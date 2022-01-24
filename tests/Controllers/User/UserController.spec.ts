import { clearAll } from '../../DBHelper';
import { app, server } from '../../../src/index'
import { User } from '../../../src/Modules/Users/models/Entities/User'

import supertest from 'supertest'

const api = supertest(app)

describe('Flow for users HAPPY path', () => {
    beforeEach(async () => { await clearAll() });

    test('create user test', async () => {

        const userToCreate: User = {
            first_name: "Andres",
            second_name: "",
            first_lastname: "Corredor",
            second_lastname: "Castro",
            email: "test4@e.com",
            password: "1233456",
            inactive: false
        }

        const response = await api.post(`/api/users`)
            .send(userToCreate)
            .expect(200);

        const { body } = response

        expect(body.email).toBe(userToCreate.email);
    })

    test('Find all users test', async () => {
        const response = await api.get(`/api/users?page=0`)
            .expect(200);

        const { body } = response

        expect(body.results).toBeTruthy()
    })
    
    afterAll(() => { server.close() })
})