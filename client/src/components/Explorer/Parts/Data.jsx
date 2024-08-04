import { hashToggle } from "../../../utils/utilities"
import { useState } from "react"
import Item from "./Item"

const Data = ({data}) => {
    const [toggle, setToggle] = useState(true)
    const keys = Object.keys(data)

    const handleToggle = () => {
        setToggle(!toggle)
    }

    return <div className="data">
        <h3 onClick={handleToggle}>Data</h3>
        {keys.map( id => {
            return <Item key={id} item={data[id]} toggle={toggle} />
        })}

    </div>
}

export default Data