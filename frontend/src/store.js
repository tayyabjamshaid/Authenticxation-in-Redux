import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import { userReducer, userRegisterReducer } from "./reducers/userReducer";
import { listReducer, listData } from "./reducers/listReducer";

const initialState = {
  userSignIn: {
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
  data: {
    listItems: localStorage.getItem("listData")
      ? JSON.parse(localStorage.getItem("listData"))
      : [],
  },
};
const reducer = combineReducers({
  userSignIn: userReducer,
  list: listReducer,
  data: listData,
  userRegister: userRegisterReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;
