const express = require('express');
const app = express();
const cors = require('cors');
const routes = require("./routes");
const {sequelize} = require('./models/index');


app.use(cors());
app.use(express.json());

app.use("/routes", routes);


sequelize.sync().then(() => {
    app.listen(5000, () => {
        console.log(`Sequelize synced successfully`);
        console.log(`Server listening on port 5000`);
    });
});


app.get("/", async (req, res) => {
    try {
        res.send(" :) ");
    } catch (err) {
        console.error('err: ', err);
        res.status(500).send(err.message);
    }
});