import { v4 } from 'uuid'
import { verifySign } from '../utils/crypto-utils.mjs'

export default class Transaction{
    constructor({sender, receiver, amount}){
        this.id = v4().replaceAll('-', '')
        this.output = this.createOutput({sender, receiver, amount})
        this.input = this.createInput({ sender, output: this.output })
    }

    static validate(transaction){
        const { input: { address, amount, signature }, output } = transaction
        const outputSum = Object.values(output.amount).reduce((total, amount) => total + amount)

        if(amount !== outputSum) return false
        if(!verifySign({publicKey: address, data: output, signature})) return false

        return true
    }

    createOutput({sender, receiver, amount}){
        const map = {}
        map['receiver'] = {key: receiver, amount: amount};
        map['sender'] = {key: sender.publicKey, balance: sender.balance - amount}
        
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

    update({sender, receiver, amount}){
        if(amount > this.output[sender.publicKey]) throw new Error('Not enough funds...')
        
        this.output[receiver] = amount
        this.output[sender.publicKey] = this.output[sender.publicKey] - amount
        this.input = this.createInput({sender, output: this.output})
    }
}