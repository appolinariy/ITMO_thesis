export const get = url => {
    fetch(url, {
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(response => response.json())
}

export const post = (url, data) => {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'applications/json',
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .catch(error => console.log(error))
}

export const update = (url, data) => {
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'applications/json',
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .catch(error => console.log(error))
}

export const del = (url, data) => {
    fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'applications/json',
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .catch(error => console.log(error))
}