import { clearAll } from '../../DBHelper';
import { app, server } from '../../../src/index'
import { Project } from '../../../src/Modules/Projects/models/Entities/Project'
import ProjectDAO from '../../../src/Modules/Projects/models/DAO/Project'

import supertest from 'supertest'

const api = supertest(app)

describe('Flow for projects SAD path', () => {
    beforeEach(async () => { await clearAll() });

    test('create project and already exist test', async () => {

        const projectToCreate: Project = {
            name: "Project x 2",
            description: "An amazing project"
        }

        await ProjectDAO.query().insert(projectToCreate)

        await api.post(`/api/projects`)
            .send(projectToCreate)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(412, { "status": 412, "message": "Project already exist" })
    })

    afterAll(() => { server.close() })
})