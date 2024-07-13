

export default class TransactionPool{
    constructor(){
        this.transactions = {}
    }
    addTransaction(transaction){
        this.transactions[transaction.id] = transaction
        return this.transactions
    }
    checkTransaction({address}){
        const check = Object.values(this.transactions)
        return check.find( transaction => transaction.input.address === address)
    }
}