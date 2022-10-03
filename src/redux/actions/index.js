export const GET_USER = 'GET_USER';
export const GET_WALLET = 'GET_WALLET';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const GET_EXCHANGES = 'GET_EXCHANGES';

export const getUser = (email) => ({
  type: GET_USER,
  email,
});

const getWalletAct = (moedas) => ({
  type: GET_WALLET,
  payload: Object.keys(moedas).filter((e) => e !== 'USDT'),
});

export const addExpenses = (expense, element) => ({
  type: ADD_EXPENSE,
  payload: { ...expense,
    exchangeRates: element,
  },
});

export function fetchAddGastos(expense) {
  return async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    dispatch(addExpenses(expense, data));
  };
}

export function fetchApi() {
  return async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    dispatch(getWalletAct(data));
  };
}
