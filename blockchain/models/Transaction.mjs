import { v4 } from 'uuid'
import { verifySign } from '../utils/crypto-utils.mjs'

export default class Transaction{
    constructor({sender, receiver, amount}){
        this.id = v4().replaceAll('-', '')
        this.output = this.createOutput({sender, receiver, amount})
        this.input = this.createInput({ sender, output: this.output })
    }

    createOutput({sender, receiver, amount}){
        const map = {}
        map[receiver] = amount;
        map[sender.publicKey] = sender.balance - amount
        
        return map
    }
    createInput({sender, output}){
        return {
            timestamp: Date.now(),
            amount: sender.balance,
            address: sender.publicKey,
            signature: sender.sign(output)
        }
    }

    static validate(transaction){
        const { input: { address, amount, signature }, output } = transaction
        const outputSum = Object.values(output).reduce((total, amount) => total + amount)

        if(amount !== outputSum) return false
        if(!verifySign({publicKey: address, data: output, signature})) return false

        return true
    }
    update({sender, receiver, amount}){
        if(amount > this.output[sender.publicKey]) throw new Error('Not enough funds...')
        
        this.output[receiver] = amount
        this.output[sender.publicKey] = this.output[sender.publicKey] - amount
        this.input = this.createInput({sender, output: this.output})
    }
}