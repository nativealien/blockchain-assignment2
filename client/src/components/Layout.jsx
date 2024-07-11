import { useState } from "react";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";

const Layout = () => {
    const [logged, setLogged] = useState(false)

  return <div className="app">
            <Header />
            <Main logged={logged} setLogged={setLogged} />
            <Footer />
        </div>
  
};

export default Layout;