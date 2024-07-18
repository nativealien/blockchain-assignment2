import History from "./History/History"

const Wallet = ({chain, wallet}) => {

    const keyString = `${wallet.key.slice(0,4)}...${wallet.key.slice(-4)}`
    console.log(wallet)
    return <div className="wallet">
        <h2>Wallet</h2>
        <div className="wallet-info">
            <p>Key: {keyString}</p>
            <p>Balance: {wallet.balance}</p>
        </div>
        <History chain={chain} walletKey={wallet.key} />
    </div>
}

export default Wallet