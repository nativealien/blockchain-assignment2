

const Item = ({item, toggle}) => {
    const senderShortHash = `${item.output.sender.key.slice(0,4)}...${item.output.sender.key.slice(-4)}`
    const reciverShortHash = `${item.output.receiver.key.slice(0,4)}...${item.output.receiver.key.slice(-4)}`

    return <div className="item" style={toggle ? {display: "none"} : {display: "block"}}>
        <p>{item.id}</p>
        <p>Sender: {senderShortHash}</p>
        <p>Reciever: {reciverShortHash}</p>
        <p>Amount: {item.output.receiver.amount} (SWO)</p>
    </div>
}

export default Item