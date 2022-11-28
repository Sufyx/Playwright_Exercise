/**
 * 20/11/2022
 * Asaf Gilboa
 * Baseshift interview exercise 
 */

const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "1234",
    host: "localhost",
    port: 5433,
    database: "postgres"
});

module.exports = pool;
