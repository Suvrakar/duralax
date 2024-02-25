// slices/dataSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "../api";
import { toast } from "react-hot-toast";

export const fetchLists = createAsyncThunk("proposal/list", async (payload) => {
  const data = await request("proposal/list", "post", payload);
  return data;
});

export const changePassword = createAsyncThunk(
  "proposal/change-password",
  async (payload) => {
    try {
      const data = await request("proposal/change-password", "post", payload);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const createProposals = createAsyncThunk("proposal/create", async (payload) => {
  const data = await request("proposal/create", "post", payload);
  return data;
});

export const updateUser = createAsyncThunk("proposal/update", async (payload) => {
  const data = await request(`proposal/${payload.roleId}`, "put", payload);
  return data;
});

const proposalSlice = createSlice({
  name: "proposalSlice",
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

      .addCase(createProposals.pending, (state) => {
        state.crudStatus = "loading";
      })
      .addCase(createProposals.fulfilled, (state, action) => {
        state.crudStatus = "success";
        toast.success("Created new role");
      })
      .addCase(createProposals.rejected, (state, action) => {
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

export const { checkToken, logOut } = proposalSlice.actions;

export default proposalSlice.reducer;
