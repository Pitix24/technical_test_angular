import Crypto from 'crypto';

export function generate() {
    const token = Crypto.randomBytes(4).toString('hex');
    return token;
}