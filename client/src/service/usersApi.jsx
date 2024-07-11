const address = 'http://localhost:4001/api/v1/auth'

const fetchData = async (url, method = 'GET', body = null) => {
    const token = localStorage.getItem('token')
    const headers = { 'Content-Type': 'application/json' }
    if(token) headers['Authorization'] = token

    console.log(body)

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

export const login = async (data) => {
    console.log('Login', data)
    const result = await fetchData(address + '/login', 'POST', data)
    if(result.data){
        localStorage.setItem('token', `Bearer ${await result.data.token}`)
        return 'Successfully logged in!'
    }else return result.message
}

export const register = async (name, email, password, role) => {
    const result = await fetchData(address + '/register', 'POST', {name: name, email: email, password: password, role: role})
    if(result.data){
        localStorage.setItem('token', `Bearer ${await result.data.token}`)
        return {data: `User ${result.data.user.name} successfully registerd! \n Press any on screen to continue.`}
    }else return result.message
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