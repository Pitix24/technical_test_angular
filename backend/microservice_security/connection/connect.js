const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_angular_test'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Conectado Correctamente');
});

module.exports = connection;
