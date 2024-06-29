import PubNub from 'pubnub'
import Blockchain from './Blockchain.mjs'
import Wallet from './Wallet.mjs'
import TransactionPool from './TransactionPool.mjs'
import Chain from './Schema/ChainSchema.mjs'
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
        this.wallets = [ new Wallet(
            process.env.MAIN_NODE === 'true' ? s.INIT_BALANCE : 0
        )]
     
        this.subscribe({ channels: CHANNELS })
        this.addListener(this.receiver())

        this.initChain()
    }
    async initChain(){
        console.log(this.wallets[0].publicKey, this.wallets[0].balance)
        const test = await Chain.findOne({ name: "blockchain" })
        this.blockchain.chain = test.chain
    }

    broadcast(channel, message){
        this.publish({
            channel: channel,
            message: message
        })
    }
    receiver(){
        return{
            message: (msgObj) => {
                const { channel, message } = msgObj
                console.log(`Message recieved on ${channel} channel: ${message}`)

                if(channel === 'Blockchain'){
                    this.blockchain.updateChain(message)
                }
                if(channel === 'Transaction'){
                    const { transaction, pool } = message
                    console.log(transaction.output.receiver)
                    console.log(this.wallets[0].publicKey)

                    if(transaction.output.receiver.key === this.wallets[0].publicKey){
                        console.log(transaction.output.receiver)
                        this.wallets[0].balance = this.wallets[0].balance + transaction.output.receiver.amount}
                    if(transaction.output.sender.key === this.wallets[0].publicKey){
                        this.wallets[0].balance = this.wallets[0].balance - transaction.output.receiver.amount}
                    console.log(this.wallets[0].balance)
                }
            }
        }
    }
}