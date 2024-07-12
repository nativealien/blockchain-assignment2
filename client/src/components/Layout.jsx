import { useEffect, useState } from "react";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";

const Layout = () => {
    const [logged, setLogged] = useState(localStorage.getItem('token') ? true : false)
    // useEffect(() => {

    // })

    const toggleLogged = () => {
      setLogged(!logged)
    }

    console.log(logged)

  return <div className="app">
            <Header />
            <Main toggle={toggleLogged} />
            <Footer />
        </div>
  
};

export default Layout;