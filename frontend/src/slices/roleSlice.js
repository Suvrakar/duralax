// slices/dataSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "../api";
import { toast } from "react-hot-toast";

export const fetchList = createAsyncThunk("roles/list", async (payload) => {
  const data = await request("roles/list", "post", payload);
  return data;
});

export const createRole = createAsyncThunk("roles/create", async (payload) => {
  const data = await request("roles/create", "post", payload);
  return data;
});

export const updateRole = createAsyncThunk("roles/update", async (payload) => {
  const data = await request(`roles/${payload.roleId}`, "put", payload);
  return data;
});

const roleSlice = createSlice({
  name: "roles",
  initialState: {
    list: [],
    status: "idle",
    error: null,
    loading: "idle",
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchList.fulfilled, (state, action) => {
        state.status = "success";
        state.list = action.payload.roles || [];
        state.totalPages = action.payload.totalPages || 0;
        state.totalItems = action.payload.totalRoles;
      })
      .addCase(fetchList.rejected, (state, action) => {
        state.status = "failed";
      })

      .addCase(createRole.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(createRole.fulfilled, (state, action) => {
        state.loading = "success";
        toast.success("Created new role");
      })
      .addCase(createRole.rejected, (state, action) => {
        state.loading = "failed";
        toast.error(action.error.message);
      })

      .addCase(updateRole.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.loading = "success";
        toast.success("Updated role success");
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.loading = "failed";
        toast.error(action.error.message);
      });
  },
});

export default roleSlice.reducer;
