import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';

const initialState = {};
const reducers = combineReducers({});

const enhancer = composeWithDevTools(applyMiddleware(thunk));
const store = createStore(reducers, initialState, enhancer);

export default store;
