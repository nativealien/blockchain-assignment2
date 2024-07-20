import { hashToggle } from "../../../utils/utilities"
import { useState } from "react"

const History = ({chain, walletKey}) => {
    const [toggle, setToggle] = useState(false)

    const filtered = chain.map( block => block.data)

    const resiArr = []
    const sendArr = []
    filtered.forEach(element => {
            const test = Object.keys(element)
            test.forEach( test => {
                if(element[test].output.receiver.key === walletKey){
                    resiArr.push(element[test].output)
                }
                if(element[test].output.sender.key === walletKey){
                    sendArr.push(element[test].output)
                }
            })
        });
    
    const handleClick = () => {
        setToggle(!toggle)
    }

    return <div className="history">
        <button onClick={handleClick}>history</button>
        <div className="history-data" style={toggle ? {display: "flex"} : {display: "none"}}>
            <div className="sent">
                <h3>Sent</h3>
                {sendArr.map( transaction => {
                    // console.log(transaction)
                    // const senderKey = `${transaction.receiver.key.slice(0,4)}...${transaction.receiver.key.slice(-4)}`
               
                    // return <p>{transaction.receiver.amount} (SWO) - TO - {senderKey}</p>
                    return toggleHash(transaction.receiver.key)
                
                })}
            </div>
            <div className="received">
            <h3>Recieved</h3>
                {resiArr.map( transaction => {
                    const senderKey = `${transaction.sender.key.slice(0,4)}...${transaction.sender.key.slice(-4)}`

                    return <p>{transaction.receiver.amount} (SWO) - FROM - {senderKey}</p>
                })}
            </div>
        </div>
    </div>
}

export default History