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

export const getAllBankUser = () => {
    return get(`http://localhost:3000/allbankusers`)
        .then(response => response)
        .catch(error => error)
}

export const createBankUser = user => {
    console.log('createBankUser effect ', user);
    return post(`http://localhost:3000/allbankusers`, user)
        .then(response => response)
        .catch(error => error)    
}