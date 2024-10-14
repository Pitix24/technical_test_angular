import mysql from 'mysql2/promise';
import { envConfigMysql } from '../hapi/cfg/config.js';


export class TokenRepository {

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
    
    async save(token) {
        const query = 'INSERT INTO tokens (token) VALUES (?)';
        try {
            await this.pool.query(query, [token]);
        } catch (err) {
            // Log error
            console.error(err);
        }

        console.log('Token registered successfully')

        return token;
    }

    async validate({ idToken }) {
        const querySelect = 'SELECT id_token FROM tokens WHERE token = ?';
        try {
            const [token] = await this.pool.query(querySelect, [idToken]);

            if (token.length > 0) {
                console.log('Valid token')
                return true
                
            } else {
                console.log('This is NOT a Valid Token')
                return false
            }

        } catch (err) {
            console.error(err)
            throw err
        }
    }
} 
