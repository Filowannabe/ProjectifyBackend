/* eslint-disable @typescript-eslint/no-var-requires */
import { clearAll } from '../../DBHelper';
import { app, server } from '../../../src/index'
import { User } from '../../../src/Modules/Users/models/Entities/User'
import { hashSomePassowrd } from '../../../src/Utils/Security/SecurityUtils';

import UserDAO from '../../../src/Modules/Users/models/DAO/User'
import supertest from 'supertest'

const jwt = require('jsonwebtoken');

const api = supertest(app)

describe('Flow for Security SAD path', () => {
    beforeEach(async () => { await clearAll() });

    test('Login but credentials are not valid test', async () => {
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
            password: "chorizo",
        }

        await api.post(`/api/security/login`)
            .send(login)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(403, { "status": 403, "message": "Invalid credentials" })

    })

    test('Login but user is not active', async () => {
        const userToCreate: User = {
            first_name: "Andres",
            second_name: "",
            first_lastname: "Lastname",
            second_lastname: "Lastname",
            email: "mustexist@e.com",
            password: await hashSomePassowrd("1233456"),
            inactive: true
        }
        await UserDAO.query().insert(userToCreate)


        const login: { email: string, password: string } = {
            email: "mustexist@e.com",
            password: "chorizo",
        }

        await api.post(`/api/security/login`)
            .send(login)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(403, { "status": 403, "message": "User deactivated" })

    })

    test('Succesfull token expiration test', async () => {

        const userToCreate: User = {
            first_name: "Andres",
            second_name: "",
            first_lastname: "Lastname",
            second_lastname: "Lastname",
            email: "mustexist@e.com",
            password: await hashSomePassowrd("1233456"),
            inactive: false
        }

        const JWT_SECRET = 'chorizo';
        const TOKEN_EXPIRATION = '3s';

        const token = jwt.sign(userToCreate, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });

        const tokenBody = { token: token }

        setTimeout(() => {
            api.post(`/api/security/validate-token`)
                .send(tokenBody)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(403, { "status": 403, "message": "Invalid credentials" })
        }, 5000)
    })

    afterAll(() => { server.close() })
})