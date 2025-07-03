 import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}`;
const USER_TOKEN = `Bearer ${localStorage.getItem("userToken")}`;

export const fetchAdminProducts = createAsyncThunk(
  "adminProducts/fetchProducts",
  async () => {
    const response = await axios.get(`${API_URL}/api/admin/products`, {
      headers: {
        Authorization: USER_TOKEN,
      },
    });
    return response.data;
  }
);

// async function to create a new Product

// async function to create a new product
export const createProduct = createAsyncThunk(
  "adminProducts/createProduct",
  async (productData) => {
    const response = await axios.post(
      `${API_URL}/api/admin/products`,
      productData,
      {
        headers: {
          Authorization: USER_TOKEN,
        },
      }
    );
    return response.data;
  }
);

export const updateProduct = createAsyncThunk(
    "adminProducts/updateProduct",
    async ({ id,productData }) => {
        const response = await axios.put(
            `${API_URL}/api/admin/products/${id}`,
           productData,
            {
                headers: {
                    Authorization: USER_TOKEN,
                },
            }
        );
        return response.data;
    }
);


// async thunk to delete a product
export const deleteProduct = createAsyncThunk(
    "adminProducts/deleteProduct",
    async (id) => {
        const response = await axios.delete(`${API_URL}/api/products/${id}`, {
            headers: {
                Authorization: USER_TOKEN,
            },
        });
        return id;
    }
);

const adminProductSlice = createSlice({
    name: "adminProducts",
    initialState: {
      products: [],
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchAdminProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // CREATE PRODUCT
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload); // Add the newly created product
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
    // UPDATE PRODUCT
.addCase(updateProduct.pending, (state) => {
    state.loading = true;
    state.error = null;
  })
  .addCase(updateProduct.fulfilled, (state, action) => {
    state.loading = false;
    const updatedProduct = action.payload;
    const index = state.products.findIndex(p => p._id === updatedProduct._id);
    if (index !== -1) {
      state.products[index] = updatedProduct;
    }
  })
  .addCase(updateProduct.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message;
  })
  // DELETE PRODUCT
.addCase(deleteProduct.pending, (state) => {
    state.loading = true;
    state.error = null;
  })
  .addCase(deleteProduct.fulfilled, (state, action) => {
    state.loading = false;
    state.products = state.products.filter(p => p._id !== action.payload);
  })
  .addCase(deleteProduct.rejected, (state, action) => {
    state.loading = false;
    state.error = action.error.message;
  });
  
  
  

    },
  });
  
  export default adminProductSlice.reducer