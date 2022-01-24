import express from 'express';
import cors from 'cors';

import { database } from './Config/Database';
import { UserRouter } from './Modules/Users/Controllers/UserRoutes';
import { ProjectRouter } from './Modules/Projects/Controllers/ProjectRoutes';
import { UserReportRouter } from './Modules/UserReports/Controllers/UserReportRoutes';
import { SecurityRouter } from './Modules/Security/Controllers/SecurityRoutes';
import { ErrorHandler } from './Utils/ErrorHandlerMiddleware';

database();

export const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', UserRouter, ProjectRouter, UserReportRouter, SecurityRouter);
app.use(ErrorHandler);

export const server = app.listen(process.env.PORT || PORT, () => {
    console.log(`Server on port ${PORT}`);
});
