import UserLayout from './components/Layout/UserLayout';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home';
import { Toaster } from "sonner"
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import CollectionPage from "./pages/CollectionPage"
import ProductDetails from './components/Product/ProductDetails';
import CheckOut from './components/Cart/CheckOut';
import OrderCnfoirmationPage from './pages/OrderCnfoirmationPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import MyOrdersPage from './pages/MyOrdersPage';
import AdminLayout from './components/Admin/AdminLayout';
import AdminhomePage from './pages/AdminhomePage';
import UserMangement from './components/Admin/UserMangement';
import ProductManagement from './components/Admin/ProductManagement';
import EditProductPage from './components/Admin/EditProductPage';
import OrderManagement from './components/Admin/OrderManagement';

import { Provider } from "react-redux"
import store from './redux/store'; 


import './App.css';
import ProtectedRoutes from './components/Common/Protectedroutes';

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profile />} />
            <Route path="collection/:collection" element={<CollectionPage />} />
            <Route path='product/:id' element={<ProductDetails />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="order-confirmation" element={<OrderCnfoirmationPage />} />
            <Route path='order/:id' element={<OrderDetailsPage />} />
            <Route path="/my-orders" element={<MyOrdersPage />} />
          </Route>
          <Route path='/admin' element={<ProtectedRoutes role="admin"><AdminLayout /></ProtectedRoutes> }>
            <Route index element={<AdminhomePage />} />
            <Route path='users' element={<UserMangement />} />
            <Route path='products' element={<ProductManagement />} />
            <Route path='products/:id/edit' element={<EditProductPage />} />
            <Route path='orders' element={<OrderManagement />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>

  )
}