import { hashToggle } from "../../../utils/utilities"

const Item = ({item, toggle}) => {

    return <div className="item" style={toggle ? {display: "none"} : {display: "block"}}>
        {hashToggle('ID: ', item.id)}
        {hashToggle('Sender: ', item.output.sender.key)}
        {hashToggle('Receiver: ', item.output.receiver.key)}
        <p>Amount: {item.output.receiver.amount} (SWO)</p>
    </div>
}

export default Item