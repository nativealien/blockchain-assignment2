

const Account = () => {
    const logged = localStorage.getItem('token') ? true : false
    const user = JSON.parse(localStorage.getItem('user'))

    
    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        location.reload()
    }

    if(logged){
        const user = JSON.parse(localStorage.getItem('user'))
        return <div className="account" style={logged ? {display: "block"} : {display: "none"}}>
            <h2>Account</h2>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>

            <button onClick={handleLogout}>Logout</button>
        </div>
    }else{
        return <></>
    }
}

export default Account