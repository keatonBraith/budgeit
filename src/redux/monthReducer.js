import axios from "axios";

const initialState = {
  months: { name: "", month_id: 0, user_id: 0 },
};

const GET_MONTHS = "GET_MONTHS";

export function getMonths() {
  const months = axios.get("/api/months/:id");
  return {
    type: GET_MONTHS,
    payload: months,
  };
}

export default function monthReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MONTHS:
      return { ...state, months: action.payload.data };
    default:
      return initialState;
  }
}
