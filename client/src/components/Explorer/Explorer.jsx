import Block from "./Block"

const Explorer = ({chain}) => {
    if(chain){
        return <div className="explorer">
            <h2>Explorer</h2>
            {chain.map( block => {
                return <Block block={block} />
            })}
        </div>
    }
}

export default Explorer

