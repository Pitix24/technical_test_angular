import { ClientController } from "../controllers/clientController.js";
import Joi from 'joi';

export const createClientRoutes = () => {
    const clientController = new ClientController();

    const clientRoutes = [
        {
            method: 'POST',
            path: '/reg-client',
            options: {
                handler: clientController.registerClient,
                description: 'Register a new client',
                notes: 'Creates a new customer account with the provided data and email. If the value of sendmail is true, a confirmation email will be sent. The registration process requires a valid ID token for authentication.',
                tags: ['api'],

                validate: {
                    payload: Joi.object({
                        first_name: Joi.string().required().description('The first name of the user.'),
                        last_name: Joi.string().required().description('The last name of the user.'),
                        email: Joi.string().required().description('The email of the user.'),
                    })
                }
            }
        }
    ]

    return clientRoutes
}
