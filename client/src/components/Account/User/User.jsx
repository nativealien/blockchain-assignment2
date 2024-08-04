import { useState } from "react"

const User = ({user, loggOut}) => {
    const [formdata, setFormdata] = useState({
        name: user.name,
        email: user.email,
        address: user.address
    })

    const handleChange = e => {
        const { name, value } = e.target
        setFormdata(preState => ({ ...preState, [name]: value }))

        console.log(formdata)
    }

    const handleClick = async e => {
        e.preventDefault()
        const result = await login(formdata)
        if(result){
            location.reload()
        }
    }

    return <form className="user">
                <h2>User</h2>
                <input type="text" name="name" value={formdata.name} onChange={handleChange} disabled/> 
                <input type="email" name="email" value={formdata.email} onChange={handleChange} disabled/>
                <input type="text" name="address" value={formdata.address} onChange={handleChange} disabled/>
                {/* <input type="text" name="role" value={user.role} /> */}
                {/* <input type="submit" value="Update" onClick={handleClick} /> */}
    </form>
}

export default User