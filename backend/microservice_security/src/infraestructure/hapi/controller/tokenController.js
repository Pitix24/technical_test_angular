import { validatePartialToken } from '../scheme/tokenScheme.js';
import { TokenService } from '../../../app/tokenService.js';

export class TokenController {

    // Inyectar el repositorio de MySQL
    constructor(TokenRepository) {
        this.tokenService = new TokenService(TokenRepository);
        
    }

    // Generar un token
    generate = async (request, h) => {
        const newToken = await this.tokenService.generateToken();
        return h.response(newToken);
    }

    // Guardar un token
    validate = async (request, h) => {
        // Extrae el idToken de los parámetros de la ruta
        const { id } = request.params;

        // Valida el idToken utilizando el esquema
        const validationResult = validatePartialToken({ tokenValue: id });

        if (validationResult.error) {
            console.log(validationResult.error);
            return h.response({ error: 'Invalid parameters.' }).code(400);
        }

        // Pasa el idToken validado al servicio para la validación
        const isValid = await this.tokenService.validateToken({ idToken: id });

        return h.response({ 'Valid token': isValid });
    }
}