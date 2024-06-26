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

    validate(transaction){}
    update({sender, reciever, amount}){}
}