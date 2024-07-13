import { fetchData } from "./fetchInstance"
import { getChain } from "./blockchainApi"

const address = 'http://localhost:4001/api/v1/auth'

export const login = async (data) => {
    console.log('Login', data)
    const result = await fetchData(address + '/login', 'POST', data)
    if(result.data){
        const { _id, name, email, role } = result.data.user
        localStorage.setItem('token', `Bearer ${await result.data.token}`)
        localStorage.setItem('user', JSON.stringify({id: _id, name: name, email: email, role: role}))
        return true
    }else return false
}

export const register = async (data) => { // name, email, address, password, role
    console.log('register at client: ', data)
    getChain(data.address)
    // const result = await fetchData(address + '/register', 'POST', data)
    // if(result.data){
    //     localStorage.setItem('token', `Bearer ${await result.data.token}`)
    //     return {data: `User ${result.data.user.name} successfully registerd! \n Press any on screen to continue.`}
    // }else return result.message
}

export const retrievePassword = async (email) => {
    console.log('Retrieve pass', email)
    const result = await fetchData(address + '/lostpassword', 'POST', {email: email})
    return result.data
}

export const resetPassword = async (url, password) => {
    const result = await fetchData(url, 'PUT', {password: password})
    console.log(result)
}

export const getUser = async () => {
    const user = await fetchData(address + '/me', 'GET')
    return user.data
}