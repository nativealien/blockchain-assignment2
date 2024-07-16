

const Chain = ({chain}) => {

    return <div className="chain">
        {chain.map( block => {

            const date = new Date(block.timestamp).toDateString()
            console.log(block)

            return <p>{date}</p>
        })}

    </div>
}

export default Chain