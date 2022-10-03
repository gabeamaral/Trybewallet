import { ADD_EXPENSE, GET_WALLET } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_WALLET:
    return { ...state, currencies: action.payload };
  case ADD_EXPENSE:
    return { ...state, expenses: [...state.expenses, action.payload] };
  default:
    return state;
  }
};

export default wallet;
