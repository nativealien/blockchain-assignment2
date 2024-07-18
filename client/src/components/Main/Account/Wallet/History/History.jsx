

const History = ({chain, walletKey}) => {

    const filtered = chain.map( block => block.data)

    filtered.forEach(element => {
            const test = Object.keys(element)
            test.forEach( test => {
                console.log(element[test].output.receiver.key === walletKey)
            })
        // console.log('TEST', test)
    });

    // console.log('History', filtered)

    // filtered.forEach( transaction => {
    //     console.log(typeof transaction)
    //     const result = test.map( trans => console.log(trans))
    //     console.log(test)
    // });
    // chain.forEach( block  => {
    //     console.log(block.data)
    // });

    return <div className="history">
        <p>history</p>
    </div>
}

export default History