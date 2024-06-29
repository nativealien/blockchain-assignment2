

export default class TransactionPool{
    constructor(){
        this.transactions = {}
    }
    addTransaction(transaction){
        this.transactions[transaction.id] = transaction
        return this.transactions
    }
    checkTransaction({address}){
        console.log('Check transaction')
        const check = Object.values(this.transactions)
        console.log(check)
        return check.find( transaction => transaction.input.address === address)
    }
}