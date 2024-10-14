import * as dotenv from 'dotenv'

dotenv.config()

export const envConfigMysql = {
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_NAME: process.env.DB_NAME || 'db_security',
    DB_PORT: process.env.DB_PORT || 3306,
    DB_USER: process.env.DB_USER || 'root',
    DB_PASSWORD: process.env.DB_PASSWORD || 'ITpg`01M[ls94l7xWD?n94hb0SL|r)'
}