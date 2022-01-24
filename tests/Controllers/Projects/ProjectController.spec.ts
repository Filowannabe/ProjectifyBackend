import { clearAll } from '../../DBHelper';
import { app, server } from '../../../src/index'
import { Project } from '../../../src/Modules/Projects/models/Entities/Project'

import supertest from 'supertest'
import { hashSomePassowrd } from '../../../src/Utils/Security/SecurityUtils';
import UserDAO from '../../../src/Modules/Users/models/DAO/User';

const api = supertest(app)
const jwt = require('jsonwebtoken');
let tokenBody: any

describe('Flow for projects HAPPY path', () => {
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


    test('create project test', async () => {
        await clearAll();
        const projectToCreate: Project = {
            name: "Project x 2",
            description: "An amazing project"
        }

        const response = await api.post(`/api/projects`)
            .set('Authorization', `Bearer ${tokenBody.token}`)
            .send(projectToCreate)
            .expect(200);

        const { body } = response

        expect(body.name).toBe(projectToCreate.name);
    })

    test('Find all projects test', async () => {
        const response = await api.get(`/api/projects?page=0`)
            .set('Authorization', `Bearer ${tokenBody.token}`)
            .expect(200);

        const { body } = response

        expect(body.results).toBeTruthy()
    })

    afterAll(() => { server.close() })
})