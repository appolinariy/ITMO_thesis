import { get, post, update, del } from './requests';

export const getFilials = () => {
    return get('http://localhost:3000/filials')
        .then(response => response)
        .catch(error => error)
}

export const getBankUserById = login => {
    return get(`http://localhost:3000/bankuser/${login}`)
        .then(response => response)
        .catch(error => error)
}

export const getBankUserFromFilial = login => {
    return get(`http://localhost:3000/filialbankuser/${login}`)
        .then(response => response)
        .catch(error => error)
}