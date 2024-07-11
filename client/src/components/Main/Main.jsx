import { useState } from "react"
import Login from "./Login"
import Signup from './Signup'
import Account from './Account'

const Main = ({logged, setLogged}) => {
    const [login, setLogin] = useState(true)

    console.log(localStorage.getItem(logged))

    const handleLogin = () => {
        setLogin(!login)
    }

    if(!logged) {
        if(login){
            return <Login setLogin={handleLogin} setLogged={setLogged} />
        }else return <Signup setLogin={handleLogin} setLogged={setLogged}  />
    }else{
        <Account setLogged={setLogged} />
    }
    
}

export default Main