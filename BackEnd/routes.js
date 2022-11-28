/**
 * 21/11/2022
 * Asaf Gilboa
 * Baseshift interview exercise 
 */

const express = require("express");
const router = express.Router();
const Controller = require('./controller');
// const {verifyUser} = require('./middleware');

router.post("/login", Controller.login);
router.get("/salariesInfo", Controller.getSalariesInfo);
router.get("/departmentsInfo", Controller.getDepartmentsInfo);


module.exports = router;