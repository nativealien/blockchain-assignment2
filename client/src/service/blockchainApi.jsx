import { fetchData } from "./fetchInstance"

const chain = '/api/v2/blockchain'
const block = '/api/v2/block'
const crypto = '/api/v2/crypto'

export const getChain = async (address) => {
    const url = address + chain
    console.log('getChain: ', url)
    const result = await fetchData(url, 'GET')
    if(result.data){
        console.log(result.data)
        return true
    }else return false
}