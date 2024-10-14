import mysql from 'mysql2/promise';
import { envConfigMysql } from "../Config/config.js";

export class ClientRepository {

    config = {}
    pool;

    constructor() {
        this.config = {
            host: envConfigMysql.DB_HOST,
            user: envConfigMysql.DB_USER,
            port: envConfigMysql.DB_PORT,
            password: envConfigMysql.DB_PASSWORD,
            database: envConfigMysql.DB_NAME
        }

        this.connect()
    }

    async connect() {
        this.pool = mysql.createPool(this.config);
    }

    async save({ first_name, last_name, email }) {
        const query = 'INSERT INTO client (first_name, last_name, email) VALUES (?, ?, ?)'

        try {
            await this.pool.query(query, [first_name, last_name, email])
            return true
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

}