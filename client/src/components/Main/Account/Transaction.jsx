import { useEffect, useState } from "react"
import { getNodes } from "../../../service/usersApi"
import { getWallet, sendTransaction } from "../../../service/blockchainApi"


const Transaction = ({user, wallet, onTransaction}) => {
    const [nodes, setNodes] = useState([])
    const [formdata, setFormdata] = useState({
        node: '',
        amount: ''
    })
    useEffect(() => {
        const loadNodes = async () => {
            const nodes = await getNodes()
            const filtered = nodes.filter( node => node !== user.address)
            console.log(filtered)
            setNodes(filtered)
        }
        loadNodes()
    }, [])

    const handleChange = e => {
        const {name, value} = e.target
        setFormdata(preState => ({ ...preState, [name]: value }))
    }

    const handleClick = async e => {
        e.preventDefault()

        const receivingWallet = await getWallet(formdata.node)
        const transaction = await sendTransaction(user.address, receivingWallet.key, formdata.amount)
        onTransaction()
    }

    return <form>
        <p>Balance: {wallet.balance}</p>
        <select name="node" defaultValue="" onChange={handleChange}>
            <option value="" disabled>Select user</option>
            {nodes.map(node => {
                return <option name='node' key={node}>{node}</option>
            })}
        </select>
        <input type="number" name='amount' placeholder="amount" onChange={handleChange} />
        <input type="submit" value="Swoosh>>>" onClick={handleClick} />
    </form>
}

export default Transaction