import History from "./History/History"
import Transaction from "./Transaction/Transaction"

const Wallet = ({chain, user, wallet, reload}) => {

    const keyString = `${wallet.key.slice(0,4)}...${wallet.key.slice(-4)}`
    return <div className="wallet">
        <h2>Wallet</h2>
        <div className="wallet-info">
            <p>Key: {keyString}</p>
            <p>Balance: {wallet.balance}</p>
        </div>
        <History chain={chain} walletKey={wallet.key} />
        <Transaction user={user} wallet={wallet} reload={reload} />
    </div>
}

export default Wallet