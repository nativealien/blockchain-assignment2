

const User = ({user, loggOut}) => {

    const handleClick = () => {
        console.log(user)
    }

    return <form className="user">
                <h2>User</h2>
                <input type="text" name="name" value={user.name} /> 
                <input type="email" name="email" value={user.email} />
                <input type="text" name="address" value={user.address} />
                <input type="text" name="role" value={user.role} />
                <input type="submit" value="Update" onClick={handleClick} />
    </form>
}

export default User