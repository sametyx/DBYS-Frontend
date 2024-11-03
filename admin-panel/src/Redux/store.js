import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "./reducers";

// Redux store'unu oluşturma
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
