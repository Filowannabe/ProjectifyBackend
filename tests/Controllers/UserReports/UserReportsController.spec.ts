import { clearAll } from '../../DBHelper';
import { app, server } from '../../../src/index'
import { UserReport } from '../../../src/Modules/UserReports/models/Entities/UserReport'

import supertest from 'supertest'
import { hashSomePassowrd } from '../../../src/Utils/Security/SecurityUtils';
import UserDAO from '../../../src/Modules/Users/models/DAO/User';
import { Project } from '../../../src/Modules/Projects/models/Entities/Project';
import { User } from '../../../src/Modules/Users/models/Entities/User';

const api = supertest(app)
const jwt = require('jsonwebtoken');
let tokenBody: any

describe('Flow for reports HAPPY path', () => {
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

    test('create user report test', async () => {
        const userToCreate: User = {
            first_name: "Andres",
            second_name: "",
            first_lastname: "Corredor",
            second_lastname: "Castro",
            email: "test4@e.com",
            password: "1233456",
            inactive: false
        }

        const newProject: Project = {
            name: "Project x 2",
            description: "An amazing project"
        }

        const userRequest = await api.post(`/api/users`)
            .set('Authorization', `Bearer ${tokenBody.token}`)
            .send(userToCreate)
            .expect(200);

        const projectRequest = await api.post(`/api/projects`)
            .set('Authorization', `Bearer ${tokenBody.token}`)
            .send(newProject)
            .expect(200);


        const reportToCreate: UserReport = {
            user_id: userRequest.body.id,
            project_id: projectRequest.body.id,
            dedication_percentage: 100
        }

        await api.post(`/api/user-reports`)
            .set('Authorization', `Bearer ${tokenBody.token}`)
            .send(reportToCreate)
            .expect(200);

    })

    test('find all reports test', async () => {
        const response = await api.get(`/api/user-reports?page=0`)
            .set('Authorization', `Bearer ${tokenBody.token}`)
            .expect(200);

        const { body } = response
        expect(body.results).toBeTruthy()
    })

    test('find all reports by user id test', async () => {

        const userToCreate: User = {
            first_name: "Andres",
            second_name: "",
            first_lastname: "Corredor",
            second_lastname: "Castro",
            email: "test4@e.com",
            password: "1233456",
            inactive: false
        }

        const userRequest = await api.post(`/api/users`)
            .set('Authorization', `Bearer ${tokenBody.token}`)
            .send(userToCreate)
            .expect(200);

        const response = await api.get(`/api/user-reports/user/${userRequest.body.id}?page=0`)
            .set('Authorization', `Bearer ${tokenBody.token}`)
            .expect(200);

        const { body } = response
        expect(body.results).toBeTruthy()
    })

    test('Update percentage in report test', async () => {
        const userToCreate: User = {
            first_name: "Andres",
            second_name: "",
            first_lastname: "Corredor",
            second_lastname: "Castro",
            email: "test4@e.com",
            password: "1233456",
            inactive: false
        }

        const newProject: Project = {
            name: "Project x 2",
            description: "An amazing project"
        }

        const userRequest = await api.post(`/api/users`)
            .set('Authorization', `Bearer ${tokenBody.token}`)
            .send(userToCreate)
            .expect(200);

        const projectRequest = await api.post(`/api/projects`)
            .set('Authorization', `Bearer ${tokenBody.token}`)
            .send(newProject)
            .expect(200);


        const reportToCreate: UserReport = {
            user_id: userRequest.body.id,
            project_id: projectRequest.body.id,
            dedication_percentage: 100
        }

        const reportRequest = await api.post(`/api/user-reports`)
            .set('Authorization', `Bearer ${tokenBody.token}`)
            .send(reportToCreate)
            .expect(200);

        expect(reportRequest.body.dedication_percentage).toBe(reportToCreate.dedication_percentage);

        const percentage: any = {
            newPercentage: 20
        }

        await api.patch(`/api/user-reports/${reportRequest.body.id}`)
            .set('Authorization', `Bearer ${tokenBody.token}`)
            .send(percentage)
            .expect(200);
    })

    afterAll(() => { server.close() })
})