import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import userReducer from "./reducer";
import monthReducer from "./monthReducer";
import transactionReducer from "./transactionReducer";

const reducer = combineReducers({
    userReducer: userReducer,
    monthsReducer: monthReducer,
    transactionReducer: transactionReducer
})

export default createStore(reducer, applyMiddleware(promiseMiddleware));