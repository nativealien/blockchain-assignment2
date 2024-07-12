import Login from "./Login/Login"
import Signup from './Signup/Signup'
import Account from './Account/Account'
import { useState } from "react"

const Main = () => {
    const [change, setChange] = useState(true)

    const toggleChange = e => {
        setChange(!change)
    }

    return <main>
        {change ? (<Login change={toggleChange} />) : (<Signup change={toggleChange} />)}
        <Account />
    </main>
    
}

export default Main