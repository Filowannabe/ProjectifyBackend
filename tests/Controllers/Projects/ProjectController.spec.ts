import { clearAll } from '../../DBHelper';
import { app, server } from '../../../src/index'
import { Project } from '../../../src/Modules/Projects/models/Entities/Project'

import supertest from 'supertest'

const api = supertest(app)

describe('Flow for projects HAPPY path', () => {
    beforeEach(async () => { await clearAll() });

    test('create project test', async () => {

        const projectToCreate: Project = {
            name: "Project x 2",
            description: "An amazing project"
        }

        const response = await api.post(`/api/projects`)
            .send(projectToCreate)
            .expect(200);

        const { body } = response

        expect(body.name).toBe(projectToCreate.name);
    })

    test('Find all projects test', async () => {
        const response = await api.get(`/api/projects?page=0`)
            .expect(200);

        const { body } = response

        expect(body.results).toBeTruthy()
    })
    
    afterAll(() => { server.close() })
})