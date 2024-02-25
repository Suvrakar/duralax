// slices/dataSlice.js test
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchData } from "../api";

const actionSlice = createSlice({
  name: "data",
  initialState: {
    data: [],
    status: "idle",
    error: null,
    isOpenMobileSidebar: false,
  },
  reducers: {
    // Normal function that dispatches an actions
    toggleSidbar: (state, action) => {
      console.log(action.payload, "action.payload");
      state.isOpenMobileSidebar = action.payload;
    },
  },
});

export const { toggleSidbar } = actionSlice.actions;

export default actionSlice.reducer;
