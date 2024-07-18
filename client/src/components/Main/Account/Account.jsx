import { useState, useEffect } from "react";
import { getChain, getWallet } from "../../../service/blockchainApi";
import Transaction from "./Transaction/Transaction";
import Wallet from "./Wallet/Wallet";
import Chain from "./Chain/Chain";
import User from "./User/User";

const Account = ({user, chain, wallet, reload}) => {
    useEffect(() => {
        reload()
    }, [])

    const logged = localStorage.getItem('token') ? true : false;

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        location.reload();
    };

    if (user && wallet) {
        return (
            <div className="account" style={logged ? { display: "block" } : { display: "none" }}>
                
                <User user={user} loggOut={handleLogout} />

                <Wallet chain={chain} wallet={wallet} />

                <Transaction user={user} wallet={wallet} reload={reload} />

            </div>
        );
    } else {
        return <></>;
    }
};

export default Account;