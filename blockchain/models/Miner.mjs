import { saveChain } from "../utils/database-utils.mjs";
import Transaction from "./Transaction.mjs";


export default class Miner{
    constructor({ blockchain, wallet, pool }){
        this.blockchain = blockchain;
        this.wallet = wallet;
        this.pool = pool;
    }
    async mine(){
        const validTransactions = this.pool.validateTransactions()

        const rewardTransaction = await Transaction.reward({ miner: this.wallet })

        validTransactions.push( rewardTransaction )

        console.log('validTransactions (pubnub): ', validTransactions)

        const block = this.blockchain.newBlock({ data: validTransactions })

        await saveChain(block)

        return block
    }
}