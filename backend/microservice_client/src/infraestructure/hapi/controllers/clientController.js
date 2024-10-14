import { RabbitService } from '../../brokers/rabbit.service.js';
import { ClientRepository } from '../../repositories/clientRepository.js';
import { RedisRepository  } from '../../repositories/globalParamRepository.js';

import { ClientService } from '../../../app/clientService.js';

import { validateClient } from '../scheme/clientScheme.js';

export class ClientController {
    
    constructor() {
        this.rabbitService = new RabbitService()
        this.globalParamRepository = new RedisRepository()
        this.clientRepository = new ClientRepository()
    
        this.clientService = new ClientService(this.globalParamRepository, this.clientRepository, this.rabbitService )
        this.registerClient = this.registerClient.bind(this);
    }
    
    
    async registerClient(request, h) {
        
        const validationResult = validateClient(request.payload);
        if (!validationResult.success) return h.response({ error: validationResult.error }).code(400);
        
        const { first_name, last_name, email } = validationResult.data;

        const isRegistedClient = await this.clientService.registerClient(first_name, last_name, email);      

        return h.response({ success: isRegistedClient, sendEmailTo: email })
    }

}