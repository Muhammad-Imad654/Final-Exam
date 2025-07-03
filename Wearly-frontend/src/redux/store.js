import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlices";
import productReducer from "./slices/productSlice"
import cartReducer from "./slices/cartSlices"
import checkoutReducer from "./slices/checkOutSlice"
import orderReducer from "./slices/OrderSlices"
import adminReducer from './slices/adminSlices';
import adminProductReducer from './slices/adminProductSlices';
import adminOrderReducer from "./slices/adminOrderSlices"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products:productReducer,
    cart:cartReducer,
    Checkout:checkoutReducer,
    order:orderReducer, 
    admin:adminReducer,
    adminProducts :adminProductReducer,
    adminOrders:adminOrderReducer

  },
});

export default store;