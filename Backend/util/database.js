const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'attandance',
    password: 'Ithinkican@123',
    timezone: 'Z'
})

module.exports = pool.promise();