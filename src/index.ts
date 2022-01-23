import express from 'express';
import cors from 'cors';

import { ErrorHandler } from './Utils/ErrorHandlerMiddleware';

export const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//app.use('/api', router);
app.use(ErrorHandler);

export const server = app.listen(process.env.PORT || PORT, () => {
    console.log(`Server on port ${PORT}`);
})