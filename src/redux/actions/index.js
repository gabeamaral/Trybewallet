export const GET_USER = 'GET_USER';
export const GET_WALLET = 'GET_WALLET';

export const getUser = (email) => ({
  type: GET_USER,
  email,
});

const getWalletAct = (moedas) => ({
  type: GET_WALLET,
  payload: Object.keys(moedas).filter((e) => e !== 'USDT'),
});

export function fetchApi() {
  return async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    dispatch(getWalletAct(data));
  };
}
