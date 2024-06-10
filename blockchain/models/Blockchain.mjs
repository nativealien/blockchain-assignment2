import Block from "./Block.mjs"

export default class Blockchain{
    constructor(){
        this.chain = [Block.genesis]
    }

    newBlock({data}) {
        const block = Block.mineBlock({
            lastBlock: this.chain.at(-1),
            data: data
        })
        this.chain.push(block)
        return block
    }
}