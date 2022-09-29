import { GET_WALLET } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expensies: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_WALLET:
    return { ...state, currencies: action.payload };
  default:
    return state;
  }
};

export default wallet;
