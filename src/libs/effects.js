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

export const sentMail = () => {
  return post(`/sentMail`)
    .then(res => res)
    .catch(error => error);
};

//CONTRACTS
export const getContracts = () => {
  return get(`/allcontracts`)
    .then(response => response)
    .catch(error => error);
};

export const createContract = contract => {
  return post(`/allcontracts`, contract)
    .then(response => response)
    .catch(error => error);
};

export const findContract = number_contract => {
  if (number_contract.length) {
    return get(`/findcontract/${number_contract}`)
      .then(res => res)
      .catch(err => console.log(err));
  } else {
    return get(`/allcontracts`)
      .then(response => response)
      .catch(error => error);
  }
};

export const filterContract = (from_date, to_date) => {
  if (from_date.length && to_date.length) {
    return get(`/filtercontract/fromdate/${from_date}/todate/${to_date}`)
      .then(res => res)
      .catch(err => console.log(err));
  } else {
    return get(`/allcontracts`)
      .then(response => response)
      .catch(error => error);
  }
};

export const filterGraphs = () => {
  return get(`/filtergraphs`)
    .then(response => response)
    .catch(error => console.log(error));
};

//PAYMENTS
export const getPaymentSchedule = number_contract => {
  return get(`/allpayments/${number_contract}`)
    .then(res => res)
    .catch(err => console.log(err));
};

export const addPaymentDebt = (
  number_contract,
  current_date_pay,
  current_amount_pay
) => {
  return update(`/allpayments/mainpay/${number_contract}`, {
    current_date_pay,
    current_amount_pay
  })
    .then(res => {
      console.log(res);
    })
    .catch(error => console.log(error));
};

export const addPaymentPenya = (
  number_contract,
  current_date_penya,
  current_amount_penya
) => {
  return update(`/allpayments/penya/${number_contract}`, {
    current_date_penya,
    current_amount_penya
  })
    .then(res => {
      console.log(res);
    })
    .catch(error => console.log(error));
};

export const countDebts = () => {
  return update(`/allpayments`)
    .then(res => res)
    .catch(err => console.log(err));
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
