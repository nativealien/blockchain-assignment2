import PubNub from 'pubnub'
import Blockchain from './Blockchain.mjs'
import Wallet from './Wallet.mjs'
import TransactionPool from './TransactionPool.mjs'
import Chain from './Schema/ChainSchema.mjs'
import { PUBNUB_CREDENTALS, CHANNELS } from '../config/settings.mjs'

export default class PubNubServer extends PubNub{
    constructor(){
        super(PUBNUB_CREDENTALS)

        this.blockchain = new Blockchain()
        this.pool = new TransactionPool()
        this.wallets = new Wallet()
     
        this.subscribe({ channels: CHANNELS })
        this.addListener(this.receiver())

        this.initChain()
    }
    async initChain(){
        console.log(this.wallets.publicKey)
        console.log(this.wallets.balance)
        const test =  await Chain.findOne({ name: "blockchain" })
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
            }
        }
    }
}