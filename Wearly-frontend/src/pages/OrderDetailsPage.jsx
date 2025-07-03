import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { fetchOrderDetails } from '../redux/slices/OrderSlices'

const OrderDetailsPage = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { orderDetails, loading, error } = useSelector((state) => state.order);

    useEffect(() => {
        if (id) {
            dispatch(fetchOrderDetails(id))
        }
    }, [dispatch, id])
    if (loading) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p>Error: {error}</p>
    }
    return (
        <div className="p-4 mx-auto max-w-7xl sm:p-6">
            <h2 className="mb-6 text-2xl font-bold md:text-3xl">Order Details</h2>

            {!orderDetails ? (
                <p>No Order details found</p>
            ) : (
                <div className="p-4 border rounded-lg sm:p-6">
                    {/* Order Info */}
                    <div className="flex flex-col justify-between mb-8 sm:flex-row">
                        <div>
                            <h3 className="text-lg font-semibold md:text-xl">
                                Order ID: #{orderDetails._id}
                            </h3>
                            <p className="text-gray-600">
                                {new Date(orderDetails.createdAt).toLocaleDateString()}
                            </p>
                        </div>

                        <div className="flex flex-col items-start mt-4 sm:items-end sm:mt-0">
                            <span
                                className={`${orderDetails.isPaid
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                    } px-3 py-1 rounded-full text-sm font-medium mb-2`}
                            >
                                {orderDetails.isPaid ? "Approved" : "Pending"}
                            </span>
                        </div>
                    </div>

                    {/* Customer, Payment, Shipping Info */}
                    <div className="grid grid-cols-1 gap-8 mb-8 sm:grid-cols-2 md:grid-cols-3">
                        {/* Payment Info */}
                        <div>
                            <h4 className="mb-2 text-lg font-semibold">Payment Info</h4>
                            <p>Payment Method: {orderDetails.paymentMethod}</p>
                            <p>Status: {orderDetails.isPaid ? "Paid" : "Unpaid"}</p>
                        </div>

                        {/* Shipping Info */}
                        <div>
                            <h4 className="mb-2 text-lg font-semibold">Shipping Info</h4>
                            <p>Shipping Method: {orderDetails.shippingMethod || 'Standard'}</p>
                            <p>
                                Address:{" "}
                                {`${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.country}`}
                            </p>
                        </div>
                    </div>

                    {/* Product List */}
                    <div className="overflow-x-auto">
                        <h4 className="mb-4 text-lg font-semibold">Products</h4>
                        <table className="min-w-full mb-4 text-gray-600">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 text-left">Name</th>
                                    <th className="px-4 py-2 text-left">Unit Price</th>
                                    <th className="px-4 py-2 text-left">Quantity</th>
                                    <th className="px-4 py-2 text-left">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderDetails.orderItems && orderDetails.orderItems.map((product) => (
                                    <tr key={product.productId} className="border-b">
                                        <td className="flex items-center px-4 py-2">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-16 h-16 mr-4 rounded-md"
                                            />
                                            <Link to={`/product/${product.productId}`} className="text-blue-500 hover:underline">
                                                {product.name}
                                                <div>
                                                    <p className="text-sm text-gray-500">
                                                        {product.color} | {product.size}
                                                    </p>
                                                </div>
                                            </Link>

                                        </td>
                                        <td className="px-4 py-2">${product.price.toFixed(2)}</td>
                                        <td className="px-4 py-2">{product.quantity}</td>
                                        <td className="px-4 py-2">
                                            ${(product.price * product.quantity).toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Back to order page */}
                    <Link to="/my-orders" className='text-blue-500 hover:underLine'>
                        Back to My orders
                    </Link>
                </div>
            )}
        </div>



    )
}

export default OrderDetailsPage
