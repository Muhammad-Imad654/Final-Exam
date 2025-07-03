import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createCheckout } from './../../redux/slices/checkOutSlice';
import { clearCart } from './../../redux/slices/cartSlices';
import axios from 'axios';


const CheckOut = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { cart, loading, error } = useSelector((state) => state.cart)
    const { user } = useSelector((state) => state.auth)
    const [checkOutId, setCheckOutId] = useState(null)
    const [processingPayment, setProcessingPayment] = useState(false)
    const [shippingAddress, setShippingAddress] = useState({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
        phone: "",
    })

    //Ensure cart is loaded
    useEffect(() => {
        if (!cart || cart.products.length === 0 || !cart.products) {
            navigate("/")
        }
    }, [cart, navigate])
    
    useEffect(() => {
        if (checkOutId) {
            console.log("CheckOutId:", checkOutId)
            console.log("Shipping Address:", shippingAddress)
            // Auto-process payment once checkout is created
            processPayment();
        }
    }, [checkOutId])

    const handleCreateCheckOut = async (e) => {
        e.preventDefault()
        if (cart && cart.products.length > 0) {
            setProcessingPayment(true);
            const res = await dispatch(
                createCheckout({
                    checkoutItems: cart.products,
                    shippingAddress,
                    paymentMethod: "Direct",
                    totalPrice: cart.totalPrice
                })
            )
            if (res.payload && res.payload._id)
                setCheckOutId(res.payload._id)
        }
    }

    const processPayment = async () => {
        try {
            console.log("Processing payment for checkout:", checkOutId);

            if (!checkOutId) {
                console.error("Missing checkout ID");
                alert("Payment processing error: Missing checkout information");
                setProcessingPayment(false);
                return;
            }

            const paymentDetails = {
                id: "DIRECT-" + Date.now(),
                status: "COMPLETED",
                update_time: new Date().toISOString(),
                payer: {
                    email_address: user.email
                }
            };

            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkOutId}/pay`,
                {
                    paymentStatus: "paid",
                    paymentDetails: paymentDetails
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`
                    }
                }
            );

            if (response.status === 200) {
                console.log("Checkout payment updated successfully:", response.data);
                await handleFinalizeCheckout(checkOutId);
            } else {
                console.error("Unexpected response status:", response.status);
                alert("Payment processing error. Please contact support.");
                setProcessingPayment(false);
            }
        } catch (error) {
            console.error("Error updating checkout payment:", error);
            alert("Payment processing error. Please try again or contact support.");
            setProcessingPayment(false);
        }
    }

    const handleFinalizeCheckout = async (checkoutId) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`,
                {}, // Empty body
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("userToken")}`
                    }
                }
            )
            if (response.status === 200 || response.status === 201) {
                console.log("Order created successfully, clearing cart");
                // Clear the cart after successful order
                dispatch(clearCart());
                setProcessingPayment(false);
                navigate("/order-confirmation")
            }
            else {
                console.error("Unexpected response status:", response.status);
                setProcessingPayment(false);
            }
        } catch (error) {
            console.error("Error finalizing checkout:", error);
            setProcessingPayment(false);
        }
    }

    if (loading || processingPayment) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p>error:{error}</p>
    }
    if (!cart || cart.products.length === 0 || !cart.products) {
        return <p>Your Cart Is empty Now</p>
    }

    return (
        <div className="grid grid-cols-1 gap-8 px-6 py-10 mx-auto tracking-tight lg:grid-cols-2 max-w-7xl">

            {/* LEFT SECTION: Form */}
            <div className="flex flex-col gap-4 p-6 bg-white border rounded-lg shadow-sm">
                <h2 className='mb-6 text-2xl uppercase'>Checkout</h2>
                <form onSubmit={handleCreateCheckOut}>
                    <h3 className='mb-4 text-lg'>Contact Details</h3>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-700">E-mail</label>
                        <input type='email' value={user.email} className='w-full p-2 border rounded' disabled />
                    </div>

                    <h3 className='mb-4 text-lg'>Delivery</h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">First Name</label>
                            <input type='text' value={shippingAddress.firstName} onChange={(e) => setShippingAddress({ ...shippingAddress, firstName: e.target.value })} className='w-full p-2 border rounded' placeholder='Enter your first name' />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">Last Name</label>
                            <input type='text' value={shippingAddress.lastName} onChange={(e) => setShippingAddress({ ...shippingAddress, lastName: e.target.value })} className='w-full p-2 border rounded' placeholder='Enter your last name' />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-700">Address</label>
                        <input type='text' value={shippingAddress.address} onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })} className='w-full p-2 border rounded' placeholder='Enter your address' />
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">City</label>
                            <input type='text' value={shippingAddress.city} onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })} className='w-full p-2 border rounded' placeholder='City' />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">Postal Code</label>
                            <input type='text' value={shippingAddress.postalCode} onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })} className='w-full p-2 border rounded' placeholder='Postal Code' />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">Country</label>
                            <input type='text' value={shippingAddress.country} onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })} className='w-full p-2 border rounded' placeholder='Country' />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-700">Phone No</label>
                        <input type='tel' value={shippingAddress.phone} onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })} className='w-full p-2 border rounded' placeholder='Phone number' />
                    </div>

                    <div className="mt-6">
                        {!checkOutId ? (
                            <button type='submit' className="w-full py-3 text-white bg-black rounded">Continue to Payment</button>
                        ) : (
                            <div>
                               <p className='bg-green-500 py-2 px-4 text-white font-medium'>Payment Successful</p>
                            </div>
                        )}
                    </div>
                </form>
            </div>

            {/* RIGHT SECTION: Order Summary */}
            <div className="p-6 border rounded-lg shadow-sm bg-gray-50 h-fit lg:sticky top-6">
                <h3 className="mb-4 text-lg font-semibold">Order Summary</h3>
                <div className="py-4 mb-4 border-t">
                    {cart.products.map((product, index) => (
                        <div key={index} className="flex items-start justify-between py-2 border-b">
                            <div className="flex items-start gap-4">
                                <img src={product.image} alt={product.name} className="object-cover w-20 h-24 mr-4" />
                                <div>
                                    <h3 className="font-semibold text-md">{product.name}</h3>
                                    <p className="text-sm text-gray-500">Size: {product.size}</p>
                                    <p className="text-sm text-gray-500">Color: {product.color}</p>
                                </div>
                            </div>
                            <p className="text-sm text-zinc-800">${product.price?.toLocaleString()}</p>
                        </div>
                    ))}
                </div>

                <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-sm font-semibold">Subtotal</span>
                    <span className="text-sm">${cart.totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-sm">Shipping</span>
                    <span className="text-sm">Free</span>
                </div>
                <div className="flex items-center justify-between py-2 mt-4 text-lg font-semibold border-t">
                    <span>Total</span>
                    <span>${cart.totalPrice.toLocaleString()}</span>
                </div>
            </div>

        </div>
    )
}

export default CheckOut
