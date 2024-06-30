import { SETTINGS as s } from "../settings/settings.mjs"

const fetchData = async (url, method = 'GET', body = null) => {
    const token = localStorage.getItem('token')
    const headers = { 'Content-Type': 'application/json' }
    if(token) headers['Authorization'] = token

    try {
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
    } catch (error) {
        console.log(error)
        return 'Bad connection...'
    }
   

}

export const getBlockchain = async () => {
    const chain = await fetchData(s.getChain)
    return chain
}

export const login = async (email, password) => {
    console.log('AUTH', email, password)
    const result = await fetchData(s.login, 'POST', {email: email, password: password})
    if(result.data){
        localStorage.setItem('token', `Bearer ${await result.data.token}`)
        location.reload()
    }else console.log(result)
}

export const getUser = async () => {
    return await fetchData(s.me, 'GET')
}

