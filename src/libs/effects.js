import { get, post, update, del } from './requests';

export const getFilials = () => {
    return get('http://localhost:3000/filials')
        .then(response => {
            console.log(response)
         })
        .catch(error => console.log('error'))
}

export const getBankUserById = id_user => {
    return get(`http://localhost:3000/bankuser/${id_user}`)
        .then(response => {
            console.log(response)
        })
        .catch(error => console.log(error))
}