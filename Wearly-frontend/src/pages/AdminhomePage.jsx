import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminProducts } from './../redux/slices/adminProductSlices';
import { fetchAllOrders } from './../redux/slices/adminOrderSlices';

const AdminHomePage = () => {
    const dispatch = useDispatch()
    const { products, loading: productsloading, error: productsError } = useSelector((state) => state.adminProducts)

    const { orders, totalOrders, totalSales, loading: ordersloading, error: ordersError } = useSelector((state) => state.adminOrders)
    useEffect(() => {
        dispatch(fetchAdminProducts());
        dispatch(fetchAllOrders())
    }, [dispatch])
    return (
        <div className="p-6 mx-auto max-w-8xl">
            <h1 className="mb-6 text-3xl font-bold">Admin Dashboard</h1>
            {productsloading || ordersloading ? (
                <p>Loading...</p>
            ) : productsError ? (
                <p className="text-red-500">Errro fetching products:{productsError}</p>
            ) : ordersError ? (
                <p className="text-red-500">Errro fetching orders:{ordersError}</p>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold">Revenue</h2>
                        <p className="text-2xl">${totalSales.toFixed(2)}</p>
                    </div>

                    <div className="p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold">Total Orders</h2>
                        <p className="text-2xl">{totalOrders} </p>
                        <Link
                            to="/admin/orders"
                            className="block mt-1 text-sm text-blue-500 hover:underline"
                        >
                            Manage Orders
                        </Link>
                    </div>

                    <div className="p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold">Total Products</h2>
                        <p className="text-2xl">{products.length}</p>
                        <Link
                            to="/admin/orders"
                            className="block mt-1 text-sm text-blue-500 hover:underline"
                        >
                            Manage Products
                        </Link>
                    </div>
                </div>
            )}
            <div className="mt-6">
                <h2 className="mb-4 text-2xl font-bold">Recent Orders</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                            <tr>
                                <th className="px-4 py-3">Order ID</th>
                                <th className="px-4 py-3">User</th>
                                <th className="px-4 py-3">Total Price</th>
                                <th className="px-4 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length > 0 ? (
                                orders.map((order) => (
                                    <tr
                                        key={order._id}
                                        className="border-b cursor-pointer hover:bg-gray-50"
                                    >
                                        <td className="p-4">{order._id}</td>
                                        <td className="p-4">{order.user?.name}</td>
                                        <td className="p-4">{order.totalPrice.toFixed(2)}</td>
                                        <td className="p-4">{order.status}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="p-4 text-center text-gray-500">
                                        No recent orders found.
                                    </td>
                                </tr>
                            )}

                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default AdminHomePage;
