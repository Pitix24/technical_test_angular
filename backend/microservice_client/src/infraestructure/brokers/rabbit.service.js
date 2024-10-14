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
        const label = `${this.rabbitSettings.protocol}://${this.rabbitSettings.username}:${this.rabbitSettings.password}@${this.rabbitSettings.hostname}`
        this.consumer = await this.amqp.connect(label);
        this.chl = await this.consumer.createChannel();
        await this.chl.assertQueue(this.queue);
    }

    async sendMessage({ email_id_client, email }) {
        await this.connect();
        try {
            const logDetails = {
                email_id_client,
                email,
                dateTime: new Date()
            }

            await this.chl.sendToQueue(this.queue, Buffer.from(JSON.stringify(logDetails)))

            console.log(`Sent to queue ${this.queue}`);
        } catch (err) {
            console.error('Error sending log:', err.message);
            throw err;
        }
    }

    async closeConnect() {
        await this.consumer.close();
    }
}
