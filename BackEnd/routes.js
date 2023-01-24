/**
 * 21/11/2022
 * Asaf Gilboa
 */

const express = require("express");
const router = express.Router();
const Controller = require('./controller');

router.post("/login", Controller.login);
router.get("/salariesInfo", Controller.getSalariesInfo);
router.get("/departmentsInfo", Controller.getDepartmentsInfo);





//-------------------//
router.get("/test", test);
const { sequelize, models } = require('./models');
const { Op } = require("sequelize");
async function test(req, res) {
    try {   

        res.send({ ok: true });
    } catch (err) {
        console.error("Nope. ", err.message);
        res.status(500).send(err);
    }

}

module.exports = router;
