// slices/dataSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "../api";
import { toast } from "react-hot-toast";

export const fetchLists = createAsyncThunk("items", async (payload) => {
  const data = await request("items", "post", payload);
  return data;
});

export const createItem = createAsyncThunk("items/create", async (payload) => {
  const data = await request("items/create", "post", payload);
  return data;
});

export const uploadImage = createAsyncThunk("upload", async (payload) => {
  const data = await request("upload", "post", payload);
  return data;
});

export const updateItem = createAsyncThunk("items/update", async (payload) => {
  const data = await request(`items/${payload.roleId}`, "put", payload);
  return data;
});
export const deleteItem = createAsyncThunk("items/delete", async (payload) => {
  const data = await request(`items/${payload.roleId}`, "delete");
  return data;
});

//material
export const mfetchLists = createAsyncThunk("material", async (payload) => {
  const data = await request("material", "post", payload);
  return data;
});

//material
export const mfetchLists2 = createAsyncThunk("materials", async (payload) => {
  const data = await request("material", "post", payload);
  return data;
});


// Define your createItem thunk
export const mcreateItem = createAsyncThunk(
  "material/create",
  async (payload) => {
    try {
      // Make the API request to create the item
      const response = await request("material/create", "post", payload);
      // Return the created item data
      return response;
    } catch (error) {
      // If an error occurs, throw it so it can be caught in the rejected action
      throw error;
    }
  }
);

export const mupdateItem = createAsyncThunk(
  "material/update",
  async (payload) => {
    const data = await request(`material/${payload.roleId}`, "put", payload);
    return data;
  }
);
export const mdeleteItem = createAsyncThunk(
  "material/delete",
  async (payload) => {
    const data = await request(`material/${payload.roleId}`, "delete");
    return data;
  }
);

const itemSlice = createSlice({
  name: "itemSlice",
  initialState: {
    list: [],
    status: "idle",
    error: null,
    loading: "idle",
    uploadStatus: "idle",
    fetchStatus: "loading",
    listForProposal: []
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
      .addCase(uploadImage.pending, (state) => {
        state.uploadStatus = "loading";
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.uploadStatus = "success";
        // toast.success("Created new item");
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.uploadStatus = "failed";
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
      })

      //material

      .addCase(mfetchLists.pending, (state) => {
        state.status = "loading";
        state.fetchStatus = "loading";
      })
      .addCase(mfetchLists2.fulfilled, (state, action) => {
        state.listForProposal = action.payload.items || [];
      })
      .addCase(mfetchLists.fulfilled, (state, action) => {
        state.status = "success";
        state.fetchStatus = "success";
        state.list = action.payload.items || [];
        state.totalPages = action.payload.totalPages || 0;
        state.totalItems = action.payload.totalRoles;
      })

      .addCase(mfetchLists.rejected, (state, action) => {
        state.status = "failed";
        state.fetchStatus = "failed";
      })

      .addCase(mcreateItem.pending, (state) => {
        // state.loading = "loading";
      })
      .addCase(mcreateItem.fulfilled, (state, action) => {
        // state.loading = "success";
        toast.success("Created new material");
      })
      .addCase(mcreateItem.rejected, (state, action) => {
        // state.loading = "failed";
        console.log(action.error.message, "action.error.message");
        toast.error(action.error.message);
      })

      .addCase(mupdateItem.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(mupdateItem.fulfilled, (state, action) => {
        state.loading = "success";
        toast.success("Updated material success");
      })
      .addCase(mupdateItem.rejected, (state, action) => {
        state.loading = "failed";
        toast.error(action.error.message);
      })
      .addCase(mdeleteItem.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(mdeleteItem.fulfilled, (state, action) => {
        state.loading = "success";
        toast.success("Deleted material success");
      })
      .addCase(mdeleteItem.rejected, (state, action) => {
        state.loading = "failed";
        toast.error(action.error.message);
      });
  },
});

export default itemSlice.reducer;
