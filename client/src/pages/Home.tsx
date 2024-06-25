import { useContext, useEffect, useState } from "react"
import { PubNubContext } from "../context/pubnubContext"
import Login from "../components/Login"

export default function Home() {
    const { pubnub, messages } = useContext(PubNubContext)

    console.log(messages)

    const chainLength = pubnub.blockchain.length;

    // console.log(pubnub.blockchain)
  

    return <div className='home'>
        <h2>Home page</h2>
        <p>{chainLength}</p>
        <button onClick={() => pubnub.update()}>GET</button>
        <button onClick={() => pubnub.mine()}>MINE</button>
        <Login />
    </div>
  }