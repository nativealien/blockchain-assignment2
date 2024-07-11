import { useState } from "react"

const Signup = ({setLogin}) => {
    const [formdata, setFormdata] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleChange = e => {
        const { name, value } = e.target
        setFormdata(preState => ({ ...preState, [type]: value }))
    }

    const handleClick = e => {
        e.preventDefault()
        console.log(formdata)
    }

    return <div className="signup">
        <h2>Signup</h2>
        <form>
            <input type="text" name="name" value={formdata.email} placeholder="username" onChange={handleChange} />
            <input type="email" name="name" value={formdata.email} placeholder="email" onChange={handleChange} />
            <input type="password" name="name" value={formdata.password} placeholder="password" onChange={handleChange} />
            <input type="submit" value="Signup" onClick={handleClick} />
        </form>
        <p>or <a href="#" onClick={setLogin}>login</a></p>
    </div>
}

export default Signup