import { useEffect, useState } from "react";
import { getChain, getWallet } from "../service/blockchainApi";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";

const Layout = () => {
  const [user, setUser] = useState(null);
  const [chain, setChain] = useState(null);
  const [wallet, setWallet] = useState(null);
  useEffect( () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      setUser(storedUser);

      const loadLogged = async (userAddress) => {
          try {
              const wallet = await getWallet(userAddress);
              const chain = await getChain(userAddress)
              setWallet(wallet);
              setChain(chain);
          } catch (error) {
              console.error("Error loading wallet:", error);
          }
      };

      if (storedUser && storedUser.address) {
          loadLogged(storedUser.address);
      }else{

      }
  }, [])

  const reload = async () => {
    if (user) {
        try {
            const wallet = await getWallet(user.address);
            const chain = await getChain(user.address);
            setChain(chain);
            setWallet(wallet);
        } catch (error) {
            console.error("Error reloading wallet:", error);
        }
    }
};

const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    location.reload();
};



  return <div className="app">
            <Header logout={handleLogout} />
            <Main user={user} chain={chain} wallet={wallet} reload={reload} />
            <Footer />
        </div>
  
};

export default Layout;