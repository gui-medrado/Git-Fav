const API_URL = 'https://api.github.com/users/'

export async function Api (username: string) : Promise<any> {
    let url = API_URL + username
    let require = await fetch(url)
    let response = require.json()
    return response
} 