import hexToBinary from 'hex-to-binary';
import crypto from 'crypto';
import pkg from 'elliptic'

export const hashString = (string) => {
    return crypto.createHash('sha256').update(string).digest('hex')
}

export const ellipticHash = new pkg.ec('secp256k1')
export const verifySign = ({ publicKey, data, signature }) => {
    const key = ellipticHash.keyFromPublic(publicKey, 'hex')
    const dataString = JSON.stringify(data)
    return key.verify(hashString(dataString), signature)
}

export const proofOfWork = (hash, diff) => {
    return hexToBinary(hash).substring(0, diff) === '0'.repeat(diff)
}