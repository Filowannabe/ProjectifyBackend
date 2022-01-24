import { clearAll } from '../../DBHelper';
import { app, server } from '../../../src/index'
import { User } from '../../../src/Modules/Users/models/Entities/User'

import supertest from 'supertest'
import { hashSomePassowrd } from '../../../src/Utils/Security/SecurityUtils';
import UserDAO from '../../../src/Modules/Users/models/DAO/User';

const api = supertest(app)
const jwt = require('jsonwebtoken');
let tokenBody: any

describe('Flow for users HAPPY path', () => {
    beforeEach(async () => {
        await clearAll();
        const userToCreate: any = {
            first_name: "Bearer",
            second_name: "",
            first_lastname: "Lastname",
            second_lastname: "Lastname",
            email: "Bearer@e.com",
            password: await hashSomePassowrd("Bearer123"),
            inactive: false
        }
        await UserDAO.query().insert(userToCreate)

        const JWT_SECRET = 'chorizo'
        const TOKEN_EXPIRATION = '1d'
        const value = await jwt.sign(userToCreate, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });

        tokenBody = { "token": value }
    });

    test('create user test', async () => {
        await clearAll();

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
            .set('Authorization', `Bearer ${tokenBody.token}`)
            .send(userToCreate)
            .expect(200);

        const { body } = response

        expect(body.email).toBe(userToCreate.email);
    })

    test('Find all users test', async () => {
        const response = await api.get(`/api/users?page=0`)
            .set('Authorization', `Bearer ${tokenBody.token}`)
            .expect(200);

        const { body } = response

        expect(body.results).toBeTruthy()
    })

    afterAll(() => { server.close() })
})