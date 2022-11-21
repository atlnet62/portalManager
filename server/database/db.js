import mysql from "mysql2/promise";

import { DB_HOST, DB_NAME, DB_USER, DB_PWD, DB_PORT } from "./../config/index.js";

const pool = mysql.createPool({
    host: DB_HOST,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PWD,
    port: DB_PORT,
    waitForConnections: true,
    connectionLimit: 10000,
    queueLimit: 0,
});

/* debug session */
pool.getConnection()
    .then((response) => {
        console.log(`Connected to ${response.config.database}`);
    })
    .catch((error) => {
        console.log(error);
    });

export default pool;
