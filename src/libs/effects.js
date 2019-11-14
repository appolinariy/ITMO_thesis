import { get, post, update, del } from './requests';

export const getFilials = () => {
    return get('http://localhost:3000/filials')
        .then(response => response)
        .catch(error => error)
}

export const getBankUserById = id_user => {
    return get(`http://localhost:3000/bankuser/${id_user}`)
        .then(response => response)
        .catch(error => error)
}