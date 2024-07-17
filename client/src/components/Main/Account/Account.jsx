import { useState, useEffect } from "react";
import { getChain, getWallet } from "../../../service/blockchainApi";
import Transaction from "./Transaction";
import Chain from "./Chain";
import User from "./User";

const Account = () => {
    const [user, setUser] = useState(null);
    const [chain, setChain] = useState(null);
    const [wallet, setWallet] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        setUser(storedUser);

        const loadWallet = async (userAddress) => {
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
            loadWallet(storedUser.address);
        }
    }, []);

    const logged = localStorage.getItem('token') ? true : false;

    const reloadWallet = async () => {
        console.log('reloadWallet', user && user.address)
        if (user && user.address) {
            try {
                const wallet = await getWallet(user.address);
                const chain = await getChain(user.address)
                setWallet(wallet);
                setChain(chain);
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

    if (user && wallet) {
        const walletString = `${wallet.key.slice(0,4)}...${wallet.key.slice(-4)}`
        return (
            <div className="account" style={logged ? { display: "block" } : { display: "none" }}>
                
                {/* <button onClick={handleLogout}>Logout</button> */}

                <User user={user} loggOut={handleLogout} />

                <Transaction user={user} wallet={wallet} onTransaction={reloadWallet} />

                <Chain chain={chain} />

            </div>
        );
    } else {
        return <></>;
    }
};

export default Account;