// slices/dataSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "../api";
import { toast } from "react-hot-toast";

export const loginApi = createAsyncThunk("user/login", async (payload) => {
  try {
    const data = await request("users/login", "post", payload);
    return data;
  } catch (error) {
    throw error;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: [],
    isLoggedIn: false,
    loading: true,
    status: "idle",
    error: null,
    user_info: {},
    isOpenMobileSidebar: false,
  },
  reducers: {
    checkToken: (state, action) => {
      state.isLoggedIn = action.payload.token || false;
      state.user_info = action.payload.user_info;
      state.loading = false;
    },

    logOut: (state) => {
      state.isLoggedIn = false;
      localStorage.clear();
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginApi.fulfilled, (state, action) => {
        state.status = "succeeded";

        const { token, data } = action.payload; // Adjust accordingly based on your API response structure
        state.user_info = data;
        state.isLoggedIn = token ? true : false;
        state.status = "success";
        // Save authToken in local storage
        localStorage.setItem("authToken", token);
        localStorage.setItem("user_info", JSON.stringify(data));
        toast.success(action.payload?.message);
      })
      .addCase(loginApi.rejected, (state, action) => {
        console.log(action, "98898989");
        state.status = "failed";
        toast.error(action.error.message);
      });
  },
});

export const { checkToken, logOut } = authSlice.actions;

export default authSlice.reducer;
