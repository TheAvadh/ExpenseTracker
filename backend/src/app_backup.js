const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app_backup = express();
const port = 8080;

// Use the CORS middleware
app_backup.use(cors());
app_backup.use(bodyParser.json());

// MySQL connection
const dbConfig = {
    host: 'expenger-db.cto0qwg2czj3.us-east-2.rds.amazonaws.com',
    user: 'root',
    password: 'taSNxQL7LKOAM80N5P4B',
    database: 'expenger-db',
};

let connection;
mysql.createConnection(dbConfig)
    .then(conn => {
        connection = conn;
        console.log('Connected to MySQL database');
    })
    .catch(err => {
        console.error('Unable to connect to MySQL:', err);
    });




    

app_backup.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});