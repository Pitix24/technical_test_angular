import { validatePartialToken } from '../scheme/tokenScheme.js';
import { TokenService } from '../../../app/tokenService.js';

export class TokenController {

    // Inyectar el repositorio de MySQL
    constructor(TokenRepository) {
        console.log(TokenRepository);
        this.tokenService = new TokenService(TokenRepository);
        
    }

    // Generar un token
    generate = async (request, h) => {
        const newToken = await this.tokenService.generateToken();
        return h.response(newToken);
    }

    // Guardar un token
    validate = async (request, h) => {
        const validationResult = validatePartialToken(request.params)

        if (validationResult.error) {
            return h.response({ error: 'Invalid parameters.' }).code(400);
        }

        const { id } = validationResult.data
        const isValid = await this.tokenService.validateToken({ idToken: id });

        return h.response({ 'Valid token': isValid });
    }
}