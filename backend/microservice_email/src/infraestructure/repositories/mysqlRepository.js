import mysql from 'mysql2/promise';
import { envConfigMysql } from '../Config/config.js';

export class MySQLMailRepository {

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

    async save({ email_id_client, email }) {
        const query = 'INSERT INTO email (email_id_client, email) VALUES (?, ?)';
        const [isSent] = await this.pool.query(query, [email_id_client, email]);
        return isSent;
    }
}