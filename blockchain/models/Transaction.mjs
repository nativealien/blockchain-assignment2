import { v4 } from 'uuid'
import { verifySign } from '../utils/crypto-utils.mjs'
import { saveTransaction } from '../utils/database-utils.mjs'

const REWARD_ADDRESS = {address: 'reward-address'}
const MINING_REWARD = 10

export default class Transaction{
    constructor({sender, receiver, amount, input, output}){
        this.id = v4().replaceAll('-', '')
        this.output = output || this.createOutput({sender, receiver, amount})
        this.input = input ||  this.createInput({ sender, output: this.output })
    }

    static async validate(transaction){
        const { input: { address, amount, signature }, output } = transaction
        
        if(!verifySign({publicKey: address, data: output, signature})) return false

        await saveTransaction(transaction)

        return true
    }

    static async reward({ miner }){
        const rewardTransaction =  new this({
            input: REWARD_ADDRESS,
            output: { [miner.publicKey]: MINING_REWARD }
        })

        await saveTransaction(rewardTransaction)
        return rewardTransaction
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