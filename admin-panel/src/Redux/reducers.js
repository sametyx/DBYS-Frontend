import {
  FETCH_FACULTIES_SUCCESS,
  FETCH_FACULTIES_FAILURE,
  INCREMENT,
  DECREMENT,
} from "./types";
import { combineReducers } from "redux";

// Başlangıç durumu
const facultiesInitialState = [];

const pageInitialState = {
  page: 1,
};

// Reducer fonksiyonu
const facultiesReducer = (state = facultiesInitialState, action) => {
  switch (action.type) {
    case FETCH_FACULTIES_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};
const pageReducer = (state = pageInitialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return { page: state.page + 1 };
    case DECREMENT:
      return { page: state.page - 1 };
    default:
      return state;
  }
};
const rootReducer = combineReducers({
  faculties: facultiesReducer,
  page: pageReducer,
});
export default rootReducer;
