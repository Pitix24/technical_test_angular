import amqplib from 'amqplib';
import { envConfigRabbit } from '../Config/config.js';

export class RabbitService {

    rabbitSettings = {}
    amqp;
    consumer;
    queue = '';
    chl;

    constructor() {
        this.rabbitSettings = {
            protocol: envConfigRabbit.RABBIT_PROTOCOL,
            hostname: envConfigRabbit.RABBIT_HOSTNAME,
            port: envConfigRabbit.RABBIT_PORT,
            username: envConfigRabbit.RABBIT_USERNAME,
            password: envConfigRabbit.RABBIT_PASSWORD,
            vhost: envConfigRabbit.RABBIT_VHOST,
            authMechanism: ['PLAIN', 'AMQPLAIN', 'EXTERNAL']
        };

        this.amqp = amqplib;
        this.queue = 'emails'
    }

    async connect() {
        try {
            const label = `${this.rabbitSettings.protocol}://${this.rabbitSettings.username}:${this.rabbitSettings.password}@${this.rabbitSettings.hostname}`;
            this.consumer = await this.amqp.connect(label);
            this.chl = await this.consumer.createChannel();
            await this.chl.assertQueue(this.queue);
        } catch (error) {
            console.error(`Error al conectar a la cola: ${error.message}`);
        }
    }

    async runConsumer(callback) {
        await this.connect();
        
        try {
            this.chl.consume(this.queue, (message) => {
                if (message === null) {
                    console.error('The message is empty');
                    return
                }

                const msg = JSON.parse(message.content.toString());
                
                this.chl.ack(message)
                callback(msg)
            });

        } catch (error) {
            console.error('Error consuming message:', error.message);
            throw error;
        }
    }                                                                                                                                                                                                                                       

    async closeConnect() {
        await this.consumer.close();
    }
}
