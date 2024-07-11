import { useState } from "react"
import { login } from "../../service/usersApi"

const Login = ({setLogin, setLogged}) => {
    const [formdata, setFormdata] = useState({
        email: '',
        password: ''
    })

    const handleChange = e => {
        const { type, value } = e.target
        setFormdata(preState => ({ ...preState, [type]: value }))
        console.log(formdata)
    }

    const handleClick = async e => {
        e.preventDefault()
        
        console.log(formdata)
        const result = await login(formdata)
        console.log(result)
    }

    return <div className="login">
        <h2>Login</h2>
        <form>
            <input type="email" value={formdata.email} placeholder="email" onChange={handleChange} />
            <input type="password" value={formdata.password} placeholder="password" onChange={handleChange} />
            <input type="submit" value="Login" onClick={handleClick} />
        </form>
        <p>or <a href="#" onClick={setLogin}>signup</a></p>
    </div>
}

export default Login