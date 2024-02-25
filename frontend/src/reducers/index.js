// reducers/index.js
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import actionReducer from "../slices/actionSlice";
import roleReducer from "../slices/roleSlice";
import userReducer from "../slices/usreSlice";
import proposalReducer from "../slices/proposalSlice";
import itemCategoryReducer from "../slices/categorySlice";
import itemReducer from "../slices/itemSlice";
import customerReducer from "../slices/customerSlice";
import globalReducer from "../slices/globalSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  actions: actionReducer,
  roles: roleReducer,
  user: userReducer,
  proposal: proposalReducer,
  item: itemReducer,
  customer: customerReducer,
  itemCategory: itemCategoryReducer,
  global: globalReducer,
  // Add more reducers if needed
});

export default rootReducer;
