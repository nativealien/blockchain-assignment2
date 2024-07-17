

const User = ({user, loggOut}) => {

    return <div className="user">
        <p>{user.name}</p>
        <button onClick={loggOut}>Logout</button>
    </div>
}

export default User