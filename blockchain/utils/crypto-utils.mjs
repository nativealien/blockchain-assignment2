import hexToBinary from 'hex-to-binary';
import crypto from 'crypto';

export const hashString = (string) => {
    return crypto.createHash('sha256').update(string).digest('hex')
}

export const proofOfWork = (hash, diff) => {
    return hexToBinary(hash).substring(0, diff) === '0'.repeat(diff)
}