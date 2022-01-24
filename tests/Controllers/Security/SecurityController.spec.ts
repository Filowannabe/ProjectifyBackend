import { clearAll } from '../../DBHelper';
import { app, server } from '../../../src/index'
import { User } from '../../../src/Modules/Users/models/Entities/User'
import { hashSomePassowrd } from '../../../src/Utils/Security/SecurityUtils';

import UserDAO from '../../../src/Modules/Users/models/DAO/User'
import supertest from 'supertest'

const api = supertest(app)

describe('Flow for Security HAPPY path', () => {
    beforeEach(async () => { await clearAll() });

    test('Succesfull login test', async () => {

        const userToCreate: User = {
            first_name: "Andres",
            second_name: "",
            first_lastname: "Lastname",
            second_lastname: "Lastname",
            email: "mustexist@e.com",
            password: await hashSomePassowrd("1233456"),
            inactive: false
        }
        await UserDAO.query().insert(userToCreate)


        const login: { email: string, password: string } = {
            email: "mustexist@e.com",
            password: "1233456",
        }

        await api.post(`/api/security/login`)
            .send(login)
            .expect(200);
    })

    test('Succesfull token validation test', async () => {

        const userToCreate: User = {
            first_name: "Andres",
            second_name: "",
            first_lastname: "Lastname",
            second_lastname: "Lastname",
            email: "mustexist@e.com",
            password: await hashSomePassowrd("1233456"),
            inactive: false
        }
        await UserDAO.query().insert(userToCreate)


        const login: { email: string, password: string } = {
            email: "mustexist@e.com",
            password: "1233456",
        }

        const response = await api.post(`/api/security/login`).send(login).expect(200);
        const { body } = response

        const tokenBody = { token: body.token }

        await api.post(`/api/security/validate-token`)
            .send(tokenBody)
            .expect(200);

    })

    afterAll(() => { server.close() })
})