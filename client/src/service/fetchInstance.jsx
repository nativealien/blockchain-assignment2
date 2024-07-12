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