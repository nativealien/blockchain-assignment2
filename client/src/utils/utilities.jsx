import { useState } from 'react'
import clipboardy from 'clipboardy'

export const hashToggle = (title, hash) => {
    const [toggle, setToggle] = useState(true)
    const shortHash = `${hash.slice(0,4)}...${hash.slice(-4)}`

    return <p className='short-hash' onClick={e => setToggle(!toggle)}>{title}{toggle ? shortHash : hash}</p>
}