import PubNub from 'pubnub'
import Blockchain from './Blockchain.mjs'
import Wallet from './Wallet.mjs'
import TransactionPool from './TransactionPool.mjs'
import Chain from './Schema/ChainSchema.mjs'

import { saveChain, savePool } from '../utils/database-utils.mjs'
import { CHANNELS, SETTINGS as s } from '../config/settings.mjs'

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
     
        this.subscribe({ channels: CHANNELS })
        this.addListener(this.receiver())

        this.initChain()
    }
    async initChain(){
        console.log(this.wallet.publicKey)
        const test = await Chain.findOne({ name: "blockchain" })
        console.log(test)
        if(test.chain.length > 0){
            this.blockchain.chain = test.chain
        }
    }

    async makeTransaction(receiver, amount){
        const transaction = this.wallet.transaction({receiver, amount})
        const transactions = this.pool.addTransaction(transaction)
        if(Object.values(this.pool.transactions).length >= 2){
            this.blockchain.newBlock({ data: this.pool.transactions })
            this.broadcast('Transaction', { output: transaction.output, pool: transactions } )
            this.broadcast('Blockchain', this.blockchain.chain)
        }else{ this.broadcast('Transaction', { output: transaction.output, pool: transactions } )}
        await saveChain()
        await savePool()
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
                    // console.log(`Message recieved on ${channel} channel: ${message}`)
                    this.blockchain.updateChain(msg)
                    this.pool.transactions = {}
                }
                if(channel === 'Transaction'){
                    const { output, pool } = msg

                    if(output.receiver.key === this.wallet.publicKey){
                        this.wallet.balance = this.wallet.balance + output.receiver.amount
                    }
                    if(output.sender.key !== this.wallet.publicKey){
                        this.pool.transactions = pool
                    }

                    console.log(this.wallet.balance)
                }
            }
        }
    }
}