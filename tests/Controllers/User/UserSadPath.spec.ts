import { clearAll } from '../../DBHelper';
import { app, server } from '../../../src/index'
import { User } from '../../../src/Modules/Users/models/Entities/User'
import  UserDAO  from '../../../src/Modules/Users/models/DAO/User'

import supertest from 'supertest'
import { hashSomePassowrd } from '../../../src/Utils/Security/SecurityUtils';

const api = supertest(app)
const jwt = require('jsonwebtoken');
let tokenBody: any

describe('Flow for users SAD path', () => {
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

    test('create user and email is wrong test', async () => {
        const userToCreate:User = {
            first_name: "Andres",
            second_name: "",
            first_lastname: "Lastname",
            second_lastname: "Lastname",
            email: "bademail",
            password: "1233456",
            inactive: false
        }

        await api.post(`/api/users`)
            .send(userToCreate)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${tokenBody.token}`)
            .expect('Content-Type', /json/)
            .expect(412, { "status": 412, "message": "Email is not valid." })
    })

    test('create user and already exist test', async () => {

        const userToCreate:User = {
            first_name: "Andres",
            second_name: "",
            first_lastname: "Lastname",
            second_lastname: "Lastname",
            email: "mustexist@e.com",
            password: "1233456",
            inactive: false
        }

        await UserDAO.query().insert(userToCreate)

        await api.post(`/api/users`)
            .send(userToCreate)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${tokenBody.token}`)
            .expect('Content-Type', /json/)
            .expect(412, { "status": 412, "message": "User already exist" })
    })
    
    afterAll(() => { server.close() })
})