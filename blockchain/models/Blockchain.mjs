import Block from "./Block.mjs"
import { hashString } from "../utils/crypto-utils.mjs"

export default class Blockchain{
    constructor(){
        this.chain = [Block.genesis]
    }

    newBlock({data}) {
        const block = Block.mineBlock({
            lastBlock: this.chain.at(-1),
            data: data
        })
        this.chain.push(block)
        return block
    }

    updateChain(newChain){
        if(newChain <= this.chain.length) return
        if(!Blockchain.validateChain(newChain)) return
        console.log('Chain validated and changed')
        this.chain = chain
    }

    static validateChain(chain){
        const genesis = JSON.stringify(Block.genesis)
        const chainGenesis = JSON.stringify(chain.at(0))

        const check = genesis === chainGenesis
        if(!check) return false
        for( let i= 1; i < chain.length; i++ ){
            const { timestamp, preHash, hash, diff, nonce, data } = chain.at(i)

            const lastHash = chain[i - 1].hash
            const lastDiff = chain[i - 1].diff
            if(preHash !== lastHash || Math.abs(lastDiff - diff) > 2) return false
            

            const checkHash = hashString(`${timestamp}${preHash}${diff}${nonce}${data}`)
            if(hash !== checkHash) return false
        }
        return true
    }
}