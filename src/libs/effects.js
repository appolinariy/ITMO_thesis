import { get, post, update, del } from "./requests";

//AUTH
export const authorization = (login, password) => {
  return post("/auth", { login, password })
    .then(response => {
      sessionStorage.setItem(
        "user",
        JSON.stringify({
          id_user: response.id_user,
          system_role: response.system_role,
          surname: response.surname,
          name: response.name,
          father_name: response.father_name
        })
      );
      return response;
    })
    .catch(error => console.log(error));
};

//FILIALS
export const getFilials = () => {
  return get("/filials")
    .then(response => response.data)
    .catch(error => error);
};

//CLIENTS (Borrowers)
export const getAllClients = () => {
  return get(`/allclients`)
    .then(response => response.data)
    .catch(error => error);
};

export const createClient = user => {
  return post(`/allclients`, user)
    .then(response => response)
    .catch(error => error);
};

export const updateClient = (user, id_client) => {
  return update(`/allclients/${id_client}`, user)
    .then(response => response)
    .catch(error => error);
};

export const deleteClient = id_client => {
  return del(`/allclients/${id_client}`)
    .then(response => response)
    .catch(error => error);
};

export const findClient = surname => {
  if (surname.length) {
    return get(`/findclients/${surname}`)
      .then(res => res)
      .catch(err => console.log(err));
  } else {
    return get(`/allclients`)
      .then(response => response)
      .catch(error => error);
  }
};

//ADMINKA
export const getBankUserById = id_user => {
  return get(`/bankuser/${id_user}`)
    .then(response => response.data)
    .catch(error => error);
};

export const getAllBankUser = () => {
  return get(`/allbankusers`)
    .then(response => response)
    .catch(error => error);
};

export const createBankUser = user => {
  return post(`/allbankusers`, user)
    .then(response => response)
    .catch(error => error);
};

export const updateBankUser = (user, id_user) => {
  return update(`/allbankusers/${id_user}`, user)
    .then(response => response)
    .catch(error => error);
};

export const findBankUser = surname => {
  if (surname.length) {
    return get(`/findbankuser/${surname}`)
      .then(res => res)
      .catch(err => console.log(err));
  } else {
    return get(`/allbankusers`)
      .then(response => response)
      .catch(error => error);
  }
};
