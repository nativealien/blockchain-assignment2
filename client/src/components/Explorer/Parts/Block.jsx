import { hashToggle } from '../../../utils/utilities'
import Data from './Data'

const Block = ({block}) => {
    const blockDate = new Date(block.timestamp).toISOString().split('T')[0]
    
    return <div className="block">
            <p>Mine date: {blockDate}</p>
            {hashToggle('Hash: ',block.hash)}
            <p>Difficulty: {block.diff} </p>
            <Data data={block.data} />
        </div>
}

export default Block