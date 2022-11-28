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

app.use(cors());
app.use(express.json());

app.use("/routes", routes);

// app.post("/things", async (req, res) => {
//     try {
//         const empData = await pool.query("SELECT last_name FROM Employees WHERE birth_date = '1954-05-01' LIMIT 3;");
//         console.log(empData.rows);
//     } catch (err) {
//         console.error(err.message);
//     }
// })


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
