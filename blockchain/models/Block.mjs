import { GENESIS_DATA, SETTINGS as s } from "../config/settings.mjs";
import { createHash, proofOfWork } from "../utils/crypto-utils.mjs";

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
        let preHash = lastBlock.hash
        let hash, timestamp;
        let diff = lastBlock.diff
        let nonce = 0

        let check = false;
        while(!check){
            nonce++;
            timestamp = Date.now()
            diff = timestamp - lastBlock.timestamp > s.MINE_RATE && diff > 1 ? diff - 1 : diff + 1;
            hash = createHash(`${timestamp}${preHash}${diff}${nonce}${data}`)
            check = proofOfWork(hash, diff)
        }
        return new this({
            timestamp,
            preHash,
            hash,
            diff,
            nonce,
            data
        })
    }
}