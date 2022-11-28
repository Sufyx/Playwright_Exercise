/**
 * 21/11/2022
 * Asaf Gilboa
 * Baseshift interview exercise 
 */


const {
    getSalariesModel, verifyUser, getDepartmentsInfoModel
} = require('./model');


async function login(req, res) {
    try {
        const userDetails = req.body;
        const confirmation = await verifyUser(userDetails);
        // console.log("controller login confirmation, ", confirmation);
        res.send({ ok: true, confirmation });
    } catch (err) {
        console.error("Caught: ", err.message);
        res.status(500).send(err);
    }
}


async function getSalariesInfo(req, res) {
    try {
        const salariesInfo = await getSalariesModel();
        res.send({ ok: true, salariesInfo });
    } catch (err) {
        console.error("Caught: ", err.message);
        res.status(500).send(err);
    }
}


async function getDepartmentsInfo(req, res) {
    try {
        const departmentsInfo = await getDepartmentsInfoModel();
        res.send({ ok: true, departmentsInfo });
    } catch (err) {
        console.error("Caught: ", err.message);
        res.status(500).send(err);
    }
}



module.exports = {
    login, getSalariesInfo, getDepartmentsInfo
};