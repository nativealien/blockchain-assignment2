import PubNub from 'pubnub'
import Blockchain from './Blockchain.mjs'
import { PUBNUB_CREDENTALS, CHANNELS } from '../config/settings.mjs'

export default class PubNubServer extends PubNub{
    constructor(){
        super(PUBNUB_CREDENTALS)

        this.blockchain = new Blockchain()
        this.subscribe({ channels: ['Blockchain', 'Client'] })
        this.addListener(this.listener())
    }

    broadcast(channel, message){
        this.publish({
            channel: channel,
            message: message
        })}
    listener(){ return { message: (msg) => {
        const { channel, message } = msg
        // console.log(msg)
        if(channel === "Blockchain"){
            // console.log(`Message on channel ${channel}`, message)
            this.blockchain.chain = message
        } 
        if(channel === 'Client'){
            const mess = message.split(' ')
            console.log(`Message on channel ${channel}`, mess[0], mess[1])
            if(mess[1] === 'update') this.broadcast(message, this.blockchain.chain)
            if(mess[1] === 'mine') {
                console.log('YES!')
                this.blockchain.newBlock({data: mess[0]})
            }
        } 
        }}}
}