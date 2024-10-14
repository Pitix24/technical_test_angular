import { validateEmail } from "../infraestructure/Schemes/mail.js";

export class EmailService {
    constructor(rabbitService, mysqlRepository) {
        this.rabbitService = rabbitService;
        this.mysqlRepository = mysqlRepository;
    }

    proccessMessage = async (msg) => {
        await this.mysqlRepository.save({
            email_id_client: msg.email_id_client,
            email: msg.email
        })
        console.log('Correo registrado en la base de datos :D');
    }

    
}