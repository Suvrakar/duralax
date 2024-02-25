// slices/dataSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "../api";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// export const loginApi = createAsyncThunk("user/login", async (payload) => {
//   const data = await request("users/login", "post", payload);
//   return data;
// });

export const fetchLists = createAsyncThunk("users/list", async (payload) => {
  const data = await request("users/list", "post", payload);
  return data;
});

export const changePassword = createAsyncThunk(
  "users/change-password",
  async (payload) => {
    try {
      const data = await request("users/change-password", "post", payload);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const createUser = createAsyncThunk("users/create", async (payload) => {
  const data = await request("users/create", "post", payload);
  return data;
});

export const updateUser = createAsyncThunk("users/update", async (payload) => {
  const data = await request(`users/${payload.roleId}`, "put", payload);
  return data;
});

const authSlice = createSlice({
  name: "data",
  initialState: {
    data: [],
    isLoggedIn: false,
    loading: true,
    status: "idle",
    crudStatus: "idle",
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

      .addCase(createUser.pending, (state) => {
        state.crudStatus = "loading";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.crudStatus = "success";
        toast.success("Created new role");
      })
      .addCase(createUser.rejected, (state, action) => {
        state.crudStatus = "failed";
      })

      .addCase(updateUser.pending, (state) => {
        state.crudStatus = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.crudStatus = "success";
        toast.success("Updated role success");
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.crudStatus = "failed";
        toast.error(action.error.message);
      })

      .addCase(changePassword.pending, (state) => {
        state.crudStatus = "loading";
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.crudStatus = "success";
        toast.success("Passowrd Changed success");
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.crudStatus = "failed";
        toast.error(action.error.message);
      })

      .addCase(fetchLists.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchLists.fulfilled, (state, action) => {
        state.fetchStatus = "success";
        state.list = action.payload.users || [];
        state.totalPages = action.payload.totalPages || 0;
        state.totalItems = action.payload.totalRoles;
      })
      .addCase(fetchLists.rejected, (state, action) => {
        state.fetchStatus = "failed";
      });
  },
});

export const { checkToken, logOut } = authSlice.actions;

export default authSlice.reducer;
