import { useState, useEffect } from "react";
import { getChain, getWallet } from "../../../service/blockchainApi";
import Transaction from "./Transaction";
import Chain from "./Chain";

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
        if (user && user.address) {
            try {
                const wallet = await getWallet(user.address);
                console.log(wallet);
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

    if (user && wallet) {
        console.log(chain)
        return (
            <div className="account" style={logged ? { display: "block" } : { display: "none" }}>
                <h2>Account</h2>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Node: {user.address}</p>
                <p>Role: {user.role}</p>
                <p>Wallet: {wallet.key}</p>
                <p>Balance: {wallet.balance}</p>

                <Transaction user={user} wallet={wallet} onTransaction={reloadWallet} />

                <button onClick={handleLogout}>Logout</button>

                <Chain chain={chain} />

            </div>
        );
    } else {
        return <></>;
    }
};

export default Account;