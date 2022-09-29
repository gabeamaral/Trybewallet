export const GET_USER = 'GET_USER';
// export const GET_WALLET = 'GET_WALLET';

export const getUser = (email) => ({
  type: GET_USER,
  email,
});
