const mysql = require('mysql2/promise');
const dbConfig = require('../config/dbConfig');

let connection;

async function initializeConnection() {
    try {
        connection = await mysql.createConnection(dbConfig);
        console.log('Connected to MySQL database');
    } catch (err) {
        console.error('Unable to connect to MySQL:', err);
    }
}

initializeConnection();

module.exports = {
    getConnection: () => connection
};
