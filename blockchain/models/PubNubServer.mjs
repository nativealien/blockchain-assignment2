import PubNub from 'pubnub'
import Blockchain from './Blockchain.mjs'
import Wallet from './Wallet.mjs'
import Miner from './Miner.mjs'
import TransactionPool from './TransactionPool.mjs'
import Chain from './Schema/ChainSchema.mjs'

import { saveChain, saveTransaction } from '../utils/database-utils.mjs'
import { CHANNELS, SETTINGS as s } from '../config/settings.mjs'
import Transaction from './Transaction.mjs'

export default class PubNubServer extends PubNub{
    constructor(){
        super({
            publishKey: process.env.PUBLISH_KEY,
            subscribeKey: process.env.SUBSCRIBE_KEY,
            secretKey: process.env.SECRET_KEY,
            userId: "Oskar"
        })

        this.blockchain = new Blockchain()
        this.pool = new TransactionPool()
        this.wallet = new Wallet()
        this.miner = new Miner({ 
            blockchain: this.blockchain,
            pool: this.pool,
            wallet: this.wallet
        })
     
        this.subscribe({ channels: CHANNELS })
        this.addListener(this.receiver())

        this.initChain()
    }
    async initChain(){
        console.log(this.wallet.publicKey)
        const test = await Chain.findOne({ name: "blockchain" })
        if(test.chain.length > 0){
            this.blockchain.chain = test.chain
        }
    }

    async makeTransaction(receiver, amount){
        const transaction = this.wallet.transaction({receiver, amount})
        const validate = Transaction.validate(transaction)

        if(validate){
            this.pool.addTransaction(transaction)
            const length = Object.values(this.pool.transactions).length 
            if(length >= 2){
                const block = await this.miner.mine()
                this.broadcast('Transaction', transaction )
                this.broadcast('Blockchain', block)
            }else{ 
                this.broadcast('Transaction', transaction )
            }
        }else{
            console.log('makeTransaction: Transaction not valid')
        }
    }

    broadcast(channel, message){
        this.publish({
            channel: channel,
            message: JSON.stringify(message)
        })
    }
    receiver(){
        return{
            message: (msgObj) => {
                const { channel, message } = msgObj
                const msg = JSON.parse(message)
                
                if(channel === 'Blockchain'){
                    this.blockchain.chain.push(msg)
                    this.pool.transactions = {}
                }
             
                if(channel === 'Transaction'){
                    const { input, output } = msg
                    console.log('Transaction Msg: ', this.wallet.balance, +output.receiver.amount)
                    if(output.receiver.key === this.wallet.publicKey){
                        this.wallet.balance = this.wallet.balance + +output.receiver.amount
                    }
                    if(output.sender.key !== this.wallet.publicKey){
                        this.pool.addTransaction(msg)
                    }
                    console.log('Balance: ', this.wallet.balance)
                }
            }
        }
    }
}