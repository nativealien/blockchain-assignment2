import { GENESIS_DATA } from "../config/settings.mjs";
const props = Object.keys(GENESIS_DATA)
import { hashString } from "../utils/crypto-utils.mjs";

export default class Block{
    constructor(props){
        this.timestamp = props.timestamp;
        this.preHash = props.preHash;
        this.hash = props.hash;
        this.diff = props.diff;
        this.nonce = props.nonce;
        this.data = props.data;
    }

    static get genesis() {
        return new this(GENESIS_DATA)
    }

    static mineBlock({ lastBlock, data }){
        const newBlock = GENESIS_DATA

        console.log(newBlock)

        newBlock.timestamp = Date.now();
        newBlock.preHash = lastBlock.hash;
        newBlock.diff = lastBlock.diff;
        newBlock.nonce = 0
        newBlock.hash = hashString(`${newBlock.timestamp}${newBlock.preHash}${newBlock.diff}${newBlock.nonce}${newBlock.data}`)
        newBlock.data = data

        return newBlock
    }
}