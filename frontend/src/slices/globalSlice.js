// slices/dataSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "../api";
import { toast } from "react-hot-toast";

export const fetchList = createAsyncThunk("global", async (payload) => {
  const data = await request("global", "post", payload);
  return data;
});

export const createItemCategory = createAsyncThunk(
  "global/create",
  async (payload) => {
    const data = await request("global/create", "post", payload);
    return data;
  }
);

export const updateitemCategory = createAsyncThunk(
  "global/update",
  async (payload) => {
    const data = await request(`global/${payload.roleId}`, "put", payload);
    return data;
  }
);
export const deleteitemCategory = createAsyncThunk(
  "global/delete",
  async (payload) => {
    const data = await request(`global/${payload.roleId}`, "delete");
    return data;
  }
);

const roleSlice = createSlice({
  name: "glableReducer",
  initialState: {
    list: [],
    status: "idle",
    error: null,
    loading: "idle",
    fetchStatus: "loading",
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchList.pending, (state) => {
        state.status = "loading";
        state.fetchStatus = "loading";
      })
      .addCase(fetchList.fulfilled, (state, action) => {
        state.status = "success";
        state.fetchStatus = "success";
        state.list = action.payload.categories || [];
        state.totalPages = action.payload.totalPages || 0;
        state.totalItems = action.payload.totalRoles;
      })
      .addCase(fetchList.rejected, (state, action) => {
        state.status = "failed";
        state.fetchStatus = "failed";
      })

      .addCase(createItemCategory.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(createItemCategory.fulfilled, (state, action) => {
        state.loading = "success";
        toast.success("Created new category");
      })
      .addCase(createItemCategory.rejected, (state, action) => {
        state.loading = "failed";
        toast.error(action.error.message);
      })

      .addCase(updateitemCategory.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(updateitemCategory.fulfilled, (state, action) => {
        state.loading = "success";
        toast.success("Updated value success");
      })
      .addCase(updateitemCategory.rejected, (state, action) => {
        state.loading = "failed";
        toast.error(action.error.message);
      })
      .addCase(deleteitemCategory.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(deleteitemCategory.fulfilled, (state, action) => {
        state.loading = "success";
        toast.success("Deleted category success");
      })
      .addCase(deleteitemCategory.rejected, (state, action) => {
        state.loading = "failed";
        toast.error(action.error.message);
      });
  },
});

export default roleSlice.reducer;
