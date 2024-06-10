import crypto from 'crypto';

export const hashString = (string) => {
    return crypto.createHash('sha256').update(string).digest('hex')
}