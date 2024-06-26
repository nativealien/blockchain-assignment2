import { v4 } from 'uuid'

export default class Transaction{
    constructor(){
        this.id = v4().replaceAll('-', '')
    }
}