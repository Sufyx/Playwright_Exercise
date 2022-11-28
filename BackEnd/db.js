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

// SELECT COLUMN_NAME, DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Employees';