// src/routes/sqlRoutes.ts

import { Router } from 'express';
import { executeSql } from '../controllers/sqlController';

const router = Router();

router.post('/execute-sql', executeSql);

export default router;
