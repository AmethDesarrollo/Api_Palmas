const { createPool } = require('mysql');

const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DB,
    connectionLimit: 10,
    debug: false,
    port: process.env.DB_PORT
});

module.exports = pool;