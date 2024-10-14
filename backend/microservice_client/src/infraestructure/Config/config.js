import * as dotenv from 'dotenv'

dotenv.config()

export const envConfigMysql = {
    DB_HOST: process.env.DB_HOST ,
    DB_NAME: process.env.DB_NAME ,
    DB_PORT: process.env.DB_PORT ,
    DB_USER: process.env.DB_USER ,
    DB_PASSWORD: process.env.DB_PASSWORD 
}

export const envConfigRabbit = {
    RABBIT_PROTOCOL: process.env.RABBIT_PROTOCOL,
    RABBIT_PORT: process.env.RABBIT_PORT,
    RABBIT_USERNAME: process.env.RABBIT_USERNAME,
    RABBIT_PASSWORD: process.env.RABBIT_PASSWORD,
    RABBIT_VHOST: process.env.RABBIT_VHOST,
    RABBIT_HOSTNAME: process.env.RABBIT_HOSTNAME,
}

export const envConfigRedis = {
    REDIS_HOST: process.env.REDIS_HOST || 'redis',
    REDIS_PORT: process.env.REDIS_PORT || 8001
}