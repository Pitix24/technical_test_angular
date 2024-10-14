import Hapi from '@hapi/hapi';
import dotenv from 'dotenv';
import { RabbitService } from './src/infraestructure/brokers/rabbit.service.js';
import { MySQLMailRepository } from './src/infraestructure/repositories/mysqlRepository.js';
import { EmailService } from './src/app/emailService.js';

const rabbitService = new RabbitService();
const mysqlRepository = new MySQLMailRepository()
const emailService = new EmailService(rabbitService, mysqlRepository)

const init = async () => {
    const hapi = Hapi;
    const server = hapi.Server({
        port: process.env.PORT ?? 3001,
        host: 'localhost',
    });


    try {
        await server.start();
        console.log('Server running at:', server.info.uri);
        await rabbitService.runConsumer(emailService.proccessMessage);
        } catch (err) {
        console.log(err);
    }
};

process.on('unhandledRejection', (err) => {
    console.log(err);
});

init();
