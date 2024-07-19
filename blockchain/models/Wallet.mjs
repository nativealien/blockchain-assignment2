import { SETTINGS as s } from "../config/settings.mjs";
import { ellipticHash, createHash } from "../utils/crypto-utils.mjs";
import Transaction from "./Transaction.mjs";

export default class Wallet{
    constructor(){
        this.balance = s.INIT_BALANCE;
        this.keys = ellipticHash.genKeyPair();
        this.publicKey = this.keys.getPublic('hex')
    }

    transaction({ receiver, amount }){
        if(amount < this.balance){
            this.balance = this.balance - amount
            return new Transaction({ sender: this, receiver, amount })
        }
        else {
            throw new Error('Insufficient funds...')
        }
    }
    sign(data){
        return this.keys.sign(createHash(data))
    }
}