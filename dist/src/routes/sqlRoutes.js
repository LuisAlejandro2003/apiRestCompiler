"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sqlController_1 = require("../controllers/sqlController");
const router = (0, express_1.Router)();
router.post('/execute-sql', sqlController_1.executeSql);
exports.default = router;
