import * as dotenv from 'dotenv'
import mysql from 'mysql2/promise';

dotenv.config(); // Importar dotenv

export const connection = mysql.createConnection({
    // Conectarme a env
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Conectado Correctamente');
});
