import Transaction from "./Transaction.mjs"


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
    validateTransactions(){
        const validTransactions = Object.values(this.transactions).filter(
            transaction => Transaction.validate(transaction)
        )
        return validTransactions
    }
}