import { useState } from "react"
import { register } from "../../../service/usersApi"

const Signup = ({toggle, change}) => {
    const [formdata, setFormdata] = useState({
        name: '',
        email: '',
        address: '',
        password: '',
        role: 'user'
    })

    const logged = localStorage.getItem('token') ? true : false

    const handleChange = e => {
        const { name, value } = e.target
        setFormdata(preState => ({ ...preState, [name]: value }))
        console.log(formdata)
    }

    const handleClick = async e => {
        e.preventDefault()
        console.log('KLICK', formdata)
        const result = await register(formdata)
        console.log(result)
    }

    return <div className="signup" style={logged ? {display: "none"} : {display: "block"}}>
        <h2>Signup</h2>
        <form>
            <input type="text" name="name" value={formdata.name} placeholder="Username" onChange={handleChange} />
            <input type="email" name="email" value={formdata.email} placeholder="Email" onChange={handleChange} />
            <input type="text" name="address" value={formdata.address} placeholder="Node address" onChange={handleChange} />
            <input type="password" name="password" value={formdata.password} placeholder="Password" onChange={handleChange} />
            <input type="submit" value="Signup" onClick={handleClick} />
        </form>
        <p>or <a href="#" onClick={change}>login</a></p>
    </div>
}

export default Signup