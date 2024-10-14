import Joi from 'joi';
import { TokenController } from '../controller/tokenController.js';
import { TokenRepository } from '../../repositories/tokenRepository.js';

export const createTokenRoutes = () => {
    const tokenRepository = new TokenRepository();
    const tokenController = new TokenController(tokenRepository);

    const tokensRoutes = [
        {
            // Generar un token
            method: 'GET',
            path: '/generate-token',
            options: {
                handler: tokenController.generate,
                description: 'Generate token',
                notes: 'Generates a security token of 8 digits.',
                tags: ['api'],
            }
        },
        {
            // Validar un token
            method: 'GET',
            path: '/validate-token/{id}',
            options: {
                handler: tokenController.validate,
                description: 'Validate Token',
                notes: 'Validates the authenticity of a security token.',
                tags: ['api'],
                validate: {
                    params: Joi.object({
                        id: Joi.string().required().description('Security token ID to validate'),
                    }),
                },
            }
        }
    ]

    return tokensRoutes
}