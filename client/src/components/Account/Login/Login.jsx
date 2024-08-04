import { useState } from "react"
import { login } from "../../../service/usersApi"

const Login = ({change, reload}) => {
    const [formdata, setFormdata] = useState({
        email: '',
        password: ''
    })

    const logged = localStorage.getItem('token') ? true : false

    const handleChange = e => {
        const { type, value } = e.target
        setFormdata(preState => ({ ...preState, [type]: value }))
    }

    const handleClick = async e => {
        e.preventDefault()
        const result = await login(formdata)
        if(result){
            location.reload()
        }
    }

    return <div className="login" style={logged ? {display: "none"} : {display: "block"}}>
        <form>
            <h2>Login</h2>
            <input type="email" value={formdata.email} placeholder="email" onChange={handleChange} />
            <input type="password" value={formdata.password} placeholder="password" onChange={handleChange} />
            <input type="submit" value="Login" onClick={handleClick} />
        </form>
        <p>or <a href="#" onClick={change}>signup</a></p>
    </div>
}

export default Login