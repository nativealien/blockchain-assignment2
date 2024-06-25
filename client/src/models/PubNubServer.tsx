import PubNub from 'pubnub'
import { PUBNUB_CREDENTIALS } from '../config/settings.js'

export default class PubNubServer extends PubNub{
    blockchain: never[]
    constructor(){
        super(PUBNUB_CREDENTIALS)

        this.blockchain = []
        this.subscribe({ channels: ['Client', 'Client1', 'Blockchain'] })
        this.addListener(this.listener())
        this.blockchain.length === 0 ? this.update() : null
    }

    broadcast(channel: string, message: any){
        this.publish({
            channel: channel,
            message: message
        })}
    listener(){ return { message: (msg : any) => {
        const { channel, message } = msg
        // console.log(msg)
        if(channel === "Blockchain"){
            // console.log(`Message on channel ${channel}`, message)
            this.blockchain = message
        } 
        if(channel === 'Client1'){
            // console.log(`Message on channel ${channel}`, message)
            this.blockchain = message
        } 
        }}}
    update(){ 
        this.broadcast('Client', 'Client1 update')}
    mine(){ 
        this.broadcast('Client', 'Client1 mine')}

}