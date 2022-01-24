import { clearAll } from '../../DBHelper';
import { app, server } from '../../../src/index'
import { Project } from '../../../src/Modules/Projects/models/Entities/Project'
import ProjectDAO from '../../../src/Modules/Projects/models/DAO/Project'

import supertest from 'supertest'
import { hashSomePassowrd } from '../../../src/Utils/Security/SecurityUtils';
import UserDAO from '../../../src/Modules/Users/models/DAO/User';

const api = supertest(app)
const jwt = require('jsonwebtoken');
let tokenBody: any

describe('Flow for projects SAD path', () => {
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

    test('create project and already exist test', async () => {

        const projectToCreate: Project = {
            name: "Project x 2",
            description: "An amazing project"
        }

        await ProjectDAO.query().insert(projectToCreate)

        await api.post(`/api/projects`)
            .send(projectToCreate)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${tokenBody.token}`)
            .expect('Content-Type', /json/)
            .expect(412, { "status": 412, "message": "Project already exist" })
    })

    afterAll(() => { server.close() })
})