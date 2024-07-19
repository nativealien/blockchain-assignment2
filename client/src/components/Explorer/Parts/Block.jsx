import Data from './Data'

const Block = ({block}) => {
    const blockDate = new Date(block.timestamp).toISOString().split('T')[0]
    const shortHash = `${block.hash.slice(0,4)}...${block.hash.slice(-4)}`
    
    return <div className="block">
            <p>Mine date: {blockDate}</p>
            <p>Hash: {shortHash}</p>
            <p>Difficulty: {block.diff} </p>
            <Data data={block.data} />
        </div>
}

export default Block