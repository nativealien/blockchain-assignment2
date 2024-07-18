

const Explorer = ({chain}) => {
    if(chain){
        return <div className="explorer">
            <h2>Explorer</h2>
            {chain.map( block => {
                const blockDate = new Date(block.timestamp).toISOString().split('T')[0]
                console.log(block)
                return <div className="block">
                    <p>Mine date: {blockDate}</p>
                    <p>Hash: </p>
                    <p>Difficulty: </p>
                    <p>Data: </p>
                </div>
            })}
        </div>
    }
}

export default Explorer

