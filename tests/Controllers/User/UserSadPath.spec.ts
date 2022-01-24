import { clearAll } from '../../DBHelper';
import { app, server } from '../../../src/index'
import { User } from '../../../src/Modules/Users/models/Entities/User'
import  UserDAO  from '../../../src/Modules/Users/models/DAO/User'

import supertest from 'supertest'

const api = supertest(app)

describe('Flow for users SAD path', () => {
    beforeEach(async () => { await clearAll() });

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
            .expect('Content-Type', /json/)
            .expect(412, { "status": 412, "message": "User already exist" })
    })
    
    afterAll(() => { server.close() })
})