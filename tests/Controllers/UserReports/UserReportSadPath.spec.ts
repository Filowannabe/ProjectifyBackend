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

    test('create report and user is not founded', async () => {
        const newProject: Project = {
            name: "Project x 2",
            description: "An amazing project"
        }

        const projectRequest = await api.post(`/api/projects`)
            .set('Authorization', `Bearer ${tokenBody.token}`)
            .send(newProject)
            .expect(200);

        const reportToCreate: UserReport = {
            user_id: 1,
            project_id: projectRequest.body.id,
            dedication_percentage: 100
        }
        await api.post(`/api/user-reports`)
            .send(reportToCreate)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${tokenBody.token}`)
            .expect('Content-Type', /json/)
            .expect(404, { "status": 404, "message": "User was not founded" })
    })

    test('create report and project is not founded', async () => {
        const userToCreate: User = {
            first_name: "Andres",
            second_name: "",
            first_lastname: "lastname",
            second_lastname: "lastname",
            email: "test4@e.com",
            password: "1233456",
            inactive: false
        }
        const userRequest = await api.post(`/api/users`)
            .set('Authorization', `Bearer ${tokenBody.token}`)
            .send(userToCreate)
            .expect(200);

        const reportToCreate: UserReport = {
            user_id: userRequest.body.id,
            project_id: 1,
            dedication_percentage: 100
        }

        await api.post(`/api/user-reports`)
            .send(reportToCreate)
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${tokenBody.token}`)
            .expect('Content-Type', /json/)
            .expect(404, { "status": 404, "message": "Project was not founded" })
    })

    test('create report and there is already one on the same week', async () => {
        const userToCreate: User = {
            first_name: "Andres",
            second_name: "",
            first_lastname: "lastname",
            second_lastname: "lastname",
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

        await api.post(`/api/user-reports`)
            .set('Authorization', `Bearer ${tokenBody.token}`)
            .send(reportToCreate)
            .expect(412, { "status": 412, "message": "Report already exist on this week" })
    })

    afterAll(() => { server.close() })
})