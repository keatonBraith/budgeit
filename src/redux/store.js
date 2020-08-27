import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import userReducer from "./reducer";
import monthReducer from "./monthReducer";

const reducer = combineReducers({
    userReducer: userReducer,
    monthsReducer: monthReducer
})

export default createStore(reducer, applyMiddleware(promiseMiddleware));