import { Router } from 'express';
import analysisRouter from './analysis.router.js';


const v1Router = Router();

v1Router.use('/analysis', analysisRouter);

export default v1Router;