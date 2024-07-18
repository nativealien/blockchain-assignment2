
const Header = ({logout}) => {

    const logged = localStorage.getItem('token') ? true : false

    const handleClick = () => {
        logout()
    }

    return <header className="header">
        <h1>Swoosh</h1>
        {logged ? (<button onClick={handleClick}>Logout</button>) : (<></>)}
    </header>
}

export default Header