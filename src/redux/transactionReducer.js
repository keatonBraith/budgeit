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
  chartInfo: [],
};

const GET_TRANSACTIONS = "GET_TRANSACTIONS";
const GET_CHARTINFO = "GET_CHARTINFO";

export function getTransactions(transactions) {
  return {
    type: GET_TRANSACTIONS,
    payload: transactions,
  };
}

export function getChartInfo(data) {
  return {
    type: GET_CHARTINFO,
    payload: data,
  };
}

export default function transactionReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return { ...state, transactions: action.payload };
    case GET_CHARTINFO:
      return { ...state, chartInfo: action.payload};
    default:
      return state;
  }
}
