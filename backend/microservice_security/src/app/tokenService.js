import { generate } from "../utils/tokenGenerator.js";

export class TokenService {
    constructor(TokenRepository) {
        this.tokenRepository = TokenRepository;
    }

    async generateToken() {
        const token = generate();
        await this.tokenRepository.save(token);
        console.log('Token generated successfully', token);
        return token;
    }

    async validateToken({ idToken }) {
        const isValid = await this.tokenRepository.validate({ idToken });
        
        return isValid;
    }
}