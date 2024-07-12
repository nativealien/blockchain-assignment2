

const Account = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const logged = localStorage.getItem('token') ? true : false

    const handleLogout = () => {
        localStorage.removeItem('token')
        location.reload()
    }

    console.log(user)

    return <div className="account" style={logged ? {display: "block"} : {display: "none"}}>
        <h2>Account</h2>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Role: {user.role}</p>

        <button onClick={handleLogout}>Logout</button>
    </div>
}

export default Account