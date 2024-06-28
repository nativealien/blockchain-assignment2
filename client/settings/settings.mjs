
const auth = 'http://localhost:4001/api/v1/'
const blockchain = 'http://localhost:5001/api/v2/'

export const SETTINGS = {
    getChain: blockchain + 'blockchain',
    login: auth + 'auth/login'
}