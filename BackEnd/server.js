/**
 * 20/11/2022
 * Asaf Gilboa
 * Baseshift interview exercise 
 */

const express = require('express');
const app = express();
const cors = require('cors');
const routes = require("./routes");
const pool = require('./db');
const Sequelize = require('sequelize');

app.use(cors());
app.use(express.json());

app.use("/routes", routes);

async function connectPG() {
    const sequelize = new Sequelize(config.postgres.options);
    try {
        await sequelize.authenticate();
        console.log("Sequelization successful");
        return sequelize;
    } catch (error) {
        console.error("Connection error: ", error.message);
    }
}


app.listen(5000, () => {
    console.log('Server listening on port 5000');
});




app.get("/", async (req, res) => {
    try {
        res.send(" :) ");
    } catch (err) {
        console.error('err: ', err);
        res.status(500).send(err.message);
    }
});
