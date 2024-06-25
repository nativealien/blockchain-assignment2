import PubNub from 'pubnub'
import Blockchain from './Blockchain.mjs'
import { PUBNUB_CREDENTALS, CHANNELS } from '../config/settings.mjs'

export default class PubNubServer extends PubNub{
    constructor(){
        super(PUBNUB_CREDENTALS)

        this.blockchain = new Blockchain()
        this.subscribe({ channels: CHANNELS })
        this.addListener(this.receiver())
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