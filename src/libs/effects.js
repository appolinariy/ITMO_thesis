import { get, post, update, del } from './requests';

export const authorization = (login, password) => {
    return post('http://localhost:3000/auth', {login, password})
    .then(response => {
        // Закинуть в sessionStorage id_user и system role, в MainComponent их достать и проверить
        sessionStorage.setItem('user', {id_user: response.id_user, system_role: response.system_role})
    })
    .catch(error => error)
}

export const getFilials = () => {
    return get('http://localhost:3000/filials')
        .then(response => response.data)
        .catch(error => error)
}

export const getBankUserById = login => {
    return get(`http://localhost:3000/bankuser/${login}`)
        .then(response => response.data)
        .catch(error => error)
}

export const getAllBankUser = () => {
    return get(`http://localhost:3000/allbankusers`)
        .then(response => response.data)
        .catch(error => error)
}

export const createBankUser = user => {
    return post(`http://localhost:3000/allbankusers`, user)
        .then(response => response)
        .catch(error => error)    
}

export const deleteBankUser = id_user => {
    return del(`http://localhost:3000/allbankusers/${id_user}`)
    .then(response => response)
    .catch(error => error)
}

export const updateBankUser = (user, id_user) => {
    return update(`http://localhost:3000/allbankusers/${id_user}`, user)
    .then(response => response)
    .catch(error => error)
}