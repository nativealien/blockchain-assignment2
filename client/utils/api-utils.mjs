import { SETTINGS as s } from "../settings/settings.mjs"

const fetchData = async (url, method = 'GET', body = null, token = null) => {
    const headers = { 'Content-Type': 'application/json' }
    if(token) headers['Authorization'] = `Bearer ${token}`

    const response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null
    })

    if(!response.ok){
        const error = await response.json();
        throw new Error(error.message || 'An error has occured...')
    }

    return response.json()
}

export const getBlockchain = async () => {
    const chain = await fetchData(s.getChain)
    return chain
}

export const login = async (body) => {
    return await fetchData(s.login, 'POST', body)
}