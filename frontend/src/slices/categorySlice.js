// slices/dataSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "../api";
import { toast } from "react-hot-toast";

export const fetchList = createAsyncThunk("item-category", async (payload) => {
  const data = await request("item-category", "post", payload);
  return data;
});

export const createItemCategory = createAsyncThunk(
  "item-category/create",
  async (payload) => {
    const data = await request("item-category/create", "post", payload);
    return data;
  }
);

export const updateitemCategory = createAsyncThunk(
  "item-category/update",
  async (payload) => {
    const data = await request(
      `item-category/${payload.roleId}`,
      "put",
      payload
    );
    return data;
  }
);
export const deleteitemCategory = createAsyncThunk(
  "item-category/delete",
  async (payload) => {
    const data = await request(`item-category/${payload.roleId}`, "delete");
    return data;
  }
);

//material category
export const mfetchList = createAsyncThunk(
  "material-category",
  async (payload) => {
    const data = await request("material-category", "post", payload);
    return data;
  }
);

export const mcreateMaterialCategory = createAsyncThunk(
  "material-category/create",
  async (payload) => {
    const data = await request("material-category/create", "post", payload);
    return data;
  }
);

export const mupdatematerialCategory = createAsyncThunk(
  "material-category/update",
  async (payload) => {
    const data = await request(
      `material-category/${payload.roleId}`,
      "put",
      payload
    );
    return data;
  }
);
export const mdeletematerialCategory = createAsyncThunk(
  "material-category/delete",
  async (payload) => {
    const data = await request(`material-category/${payload.roleId}`, "delete");
    return data;
  }
);

const roleSlice = createSlice({
  name: "itemCategoryReducer",
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
        toast.success("Updated category success");
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
      })

      //material category
      .addCase(mfetchList.pending, (state) => {
        state.status = "loading";
        state.fetchStatus = "loading";
      })
      .addCase(mfetchList.fulfilled, (state, action) => {
        state.status = "success";
        state.fetchStatus = "success";
        state.list = action.payload.categories || [];
        state.totalPages = action.payload.totalPages || 0;
        state.totalItems = action.payload.totalRoles;
      })
      .addCase(mfetchList.rejected, (state, action) => {
        state.status = "failed";
        state.fetchStatus = "failed";
      })

      .addCase(mcreateMaterialCategory.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(mcreateMaterialCategory.fulfilled, (state, action) => {
        state.loading = "success";
        toast.success("Created new category");
      })
      .addCase(mcreateMaterialCategory.rejected, (state, action) => {
        state.loading = "failed";
        toast.error(action.error.message);
      })

      .addCase(mupdatematerialCategory.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(mupdatematerialCategory.fulfilled, (state, action) => {
        state.loading = "success";
        toast.success("Updated category success");
      })
      .addCase(mupdatematerialCategory.rejected, (state, action) => {
        state.loading = "failed";
        toast.error(action.error.message);
      })
      .addCase(mdeletematerialCategory.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(mdeletematerialCategory.fulfilled, (state, action) => {
        state.loading = "success";
        toast.success("Deleted category success");
      })
      .addCase(mdeletematerialCategory.rejected, (state, action) => {
        state.loading = "failed";
        toast.error(action.error.message);
      });
  },
});

export default roleSlice.reducer;
