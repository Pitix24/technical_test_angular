export class EmailService {
    constructor(rabbitService, mysqlRepository) {
        this.rabbitService = rabbitService;
        this.mysqlRepository = mysqlRepository;
    }

    proccessMessage = async (msg) => {
        const validationResult = validateEmail(msg)

        if (!validationResult.success) return validationResult.error

        const { email_id_client, email } = validationResult.data;
        await this.mysqlRepository.save({ email_id_client, email })
        console.log('Correo registrado en la base de datos :D');
    }
}