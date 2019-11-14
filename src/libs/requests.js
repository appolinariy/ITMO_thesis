export const get = url =>
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .catch(error => error)

export const post = (url, data) =>
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'applications/json',
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .catch(error => error)

export const update = (url, data) =>
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'applications/json',
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .catch(error => error)

export const del = (url, data) =>
    fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'applications/json',
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .catch(error => error)