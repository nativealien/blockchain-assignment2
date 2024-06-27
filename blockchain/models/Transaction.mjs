import { v4 } from 'uuid'

export default class Transaction{
    constructor({sender, reciever, amount}){
        this.id = v4().replaceAll('-', '')
        this.output = this.createOutput({sender, reciever, amount})
        this.input = this.createInput({ sender, output: this.output })
    }

    createOutput({sender, reciever, amount}){
        const map = {}
        map[reciever] = amount;
        map[sender.publicKey] = sender.balance - amount
        
        return map
    }
    createInput({sender, output}){
        return {
            timestamp: Date.now(),
            amount: sender.balance,
            address: sender.publicKey,
            signature: output
        }
    }

    static validate(transaction){
        const { input: { address, amount, signature }, output } = transaction
        const outputSum = Object.values(output).reduce((total, amount) => total + amount)

        if(amount !== outputSum) return false

        return true
    }
    update({sender, reciever, amount}){
        if(amount > this.output[sender.publicKey]) throw new Error('Not enough funds...')
        
        this.output[reciever] = amount
        this.output[sender.publicKey] = this.output[sender.publicKey] - amount
        this.input = this.createInput({sender, output: this.output})
    }
}