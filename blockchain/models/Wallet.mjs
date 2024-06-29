import { SETTINGS as s } from "../config/settings.mjs";
import { ellipticHash, createHash } from "../utils/crypto-utils.mjs";
import Transaction from "./Transaction.mjs";

export default class Wallet{
    constructor(){
        this.balance = process.env.MAIN_NODE === 'true' ? s.INIT_BALANCE : 0;
        this.keys = ellipticHash.genKeyPair();
        this.publicKey = this.keys.getPublic('hex')
    }

    // static getBalance({chain, publicKey}){

    //     for(let i = chain.lengh-1; i > 0; i--){
    //         const { tr}
    //     }
    // }

    transaction({ receiver, amount }){
        if(amount < this.balance) return new Transaction({ sender: this, receiver, amount })
        else throw new Error('You are poor...')
    }
    sign(data){
        return this.keys.sign(createHash(data))
    }
}