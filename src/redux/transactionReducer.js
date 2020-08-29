const initialState = {
  transactions: [
    {
      date: "",
      description: "",
      category: "",
      amount: 0,
      type: "",
      transaction_id: 0,
      month_id: 0,
    },
  ],
};

const GET_TRANSACTIONS = "GET_TRANSACTIONS";

export function getTransactions(transactions) {
  return {
    type: GET_TRANSACTIONS,
    payload: transactions,
  };
}

export default function transactionReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return { ...state, transactions: action.payload };
    default:
      return state;
  }
}
