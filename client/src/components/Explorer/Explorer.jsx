import Block from "./Parts/Block"

const Explorer = ({chain}) => {
    if(chain){
        return <div className="explorer">
            <h2>Explorer</h2>
            {chain.map( (block, index) => {
                return <Block key={index} block={block} />
            })}
        </div>
    }
}

export default Explorer

