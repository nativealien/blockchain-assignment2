import Login from "./Login/Login"
import Signup from './Signup/Signup'
import Account from './Account/Account'
import { useState } from "react"

const Main = ({user, chain, wallet, reload}) => {
    const [change, setChange] = useState(true)

    const toggleChange = e => {
        reload()
        setChange(!change)
    }

    return <main className="main">
        {change ? (<Login change={toggleChange} reload={reload} />) : (<Signup change={toggleChange} />)}
        <Account user={user} chain={chain} wallet={wallet} reload={reload} />
    </main>
    
}

export default Main