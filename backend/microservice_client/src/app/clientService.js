export class ClientService {

    constructor(GlobalParamRepository, ClientRepository, RabbitMQ) {
        this.globalParamRepository = GlobalParamRepository;
        this.clientRepository = ClientRepository;
        this.rabbitMQ = RabbitMQ;
    }

    async registerClient(first_name, last_name, email) {

        this.clientRepository.save({ first_name, last_name, email })
        const value = await this.globalParamRepository.getValues({ key: 'send_welcome_email' })

        if (value == 1) {
            await this.rabbitMQ.sendMessage({ email_id_client: 1, email })
        }

        return true
    }

}