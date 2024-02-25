// slices/dataSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "../api";
import { toast } from "react-hot-toast";

export const fetchLists = createAsyncThunk("customer", async (payload) => {
  const data = await request("customer", "post", payload);
  return data;
});
export const fetchLists2 = createAsyncThunk("customer2", async (payload) => {
  const data = await request("customer", "post", payload);
  return data;
});

export const createItem = createAsyncThunk(
  "customer/create",
  async (payload) => {
    const data = await request("customer/create", "post", payload);
    return data;
  }
);

export const updateItem = createAsyncThunk(
  "customer/update",
  async (payload) => {
    const data = await request(`customer/${payload.roleId}`, "put", payload);
    return data;
  }
);
export const deleteItem = createAsyncThunk(
  "customer/delete",
  async (payload) => {
    const data = await request(`customer/${payload.roleId}`, "delete");
    return data;
  }
);

const customerSlice = createSlice({
  name: "customerSlice",
  initialState: {
    list: [],
    list2: [],
    status: "idle",
    error: null,
    loading: "idle",
    uploadStatus: "idle",
    fetchStatus: "loading",
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchLists.pending, (state) => {
        state.status = "loading";
        state.fetchStatus = "loading";
      })
      .addCase(fetchLists.fulfilled, (state, action) => {
        state.status = "success";
        state.fetchStatus = "success";
        state.list = action.payload.items || [];
        state.totalPages = action.payload.totalPages || 0;
        state.totalItems = action.payload.totalRoles;
      })
      .addCase(fetchLists2.fulfilled, (state, action) => {
        state.fetchStatus = "success";
        state.list2 = action.payload.items || [];
      })
      .addCase(fetchLists.rejected, (state, action) => {
        state.status = "failed";
        state.fetchStatus = "failed";
      })

      .addCase(createItem.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(createItem.fulfilled, (state, action) => {
        state.loading = "success";
        toast.success("Created new item");
      })
      .addCase(createItem.rejected, (state, action) => {
        state.loading = "failed";
        toast.error(action.error.message);
      })

      .addCase(updateItem.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        state.loading = "success";
        toast.success("Updated item success");
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.loading = "failed";
        toast.error(action.error.message);
      })
      .addCase(deleteItem.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.loading = "success";
        toast.success("Deleted item success");
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.loading = "failed";
        toast.error(action.error.message);
      });
  },
});

export default customerSlice.reducer;
