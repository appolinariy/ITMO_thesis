const handleError = (response) => {
    if (!response.status) {
        throw Error(response.message)
    }
    return response
}

const baseUrl = 'http://localhost:3000'
// const baseUrl = 'http://192.168.19.198:3000'

export const get = url =>
    fetch(baseUrl + url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
        .then(handleError)

export const post = (url, data) =>
    fetch(baseUrl + url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(handleError)

export const update = (url, data) =>
    fetch(baseUrl + url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(handleError)

export const del = (url, data) =>
    fetch(baseUrl + url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'applications/json',
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(handleError)