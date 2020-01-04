const mysql = require("mysql");
const config = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'sistema_turnos_rest_fake',
};

const pool = mysql.createPool(config);
module.exports = pool;