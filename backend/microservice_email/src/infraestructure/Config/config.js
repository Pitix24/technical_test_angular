import * as dotenv from 'dotenv'

dotenv.config()

export const envConfigMysql = {
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_NAME: process.env.DB_NAME || 'MS_MAIL',
    DB_PORT: process.env.DB_PORT || 3306,
    DB_USER: process.env.DB_USER || 'root',
    DB_PASSWORD: process.env.DB_PASSWORD || ''
}

export const envConfigRabbit = {
    RABBIT_PROTOCOL: process.env.RABBIT_PROTOCOL,
    RABBIT_PORT: process.env.RABBIT_PORT,
    RABBIT_USERNAME: process.env.RABBIT_USERNAME,
    RABBIT_PASSWORD: process.env.RABBIT_PASSWORD,
    RABBIT_VHOST: process.env.RABBIT_VHOST,
    RABBIT_HOSTNAME: process.env.RABBIT_HOSTNAME,
}