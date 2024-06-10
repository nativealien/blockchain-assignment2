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

    static mineBlock({ preBlock, data }){
        const newBlock = GENESIS_DATA

        newBlock.timestamp = Date.now();
        newBlock.preHash = preBlock.hash;
        newBlock.diff = preBlock.diff;
        newBlock.nonce = 0
        newBlock.hash = hashString(`${timestamp}${preHash}${diff}${nonce}${data}`)
        newBlock.data = data

        return newBlock
    }
}