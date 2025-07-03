import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { clearCart } from "../redux/slices/cartSlices";

const OrderConfirmationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 1️⃣ Select your checkout data.
  //    Replace `state.checkOut` below with the exact key you used in combineReducers.
  //    e.g. if you did `combineReducers({ checkout: checkoutReducer })`,
  //         use `state.checkout`.
  const checkout = useSelector((state) => state.checkOut);
  // OR if your slice is named `checkout`:
  // const checkout = useSelector((state) => state.checkout);

  // 2️⃣ When the component mounts, if we have a valid checkout, clear the cart;
  //    otherwise redirect back to /my-order.
  useEffect(() => {
    if (checkout && checkout._id) {
      dispatch(clearCart());
      localStorage.removeItem("cart");
    } else {
      navigate("/my-orders");
    }
  }, [checkout, dispatch, navigate]);

  // 3️⃣ Utility to calculate delivery date
  const calculateEstimatedDelivery = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 10);
    return orderDate.toLocaleDateString();
  };

  // 4️⃣ Render
  return (
    <div className="p-6 px-4 py-10 mx-auto bg-white max-w-7xl">
      <h1 className="mb-8 text-4xl font-bold text-center text-emerald-700">
        Thank you for your order!
      </h1>

      {!checkout ? (
        <p>Loading your order details…</p>
      ) : (
        <div className="p-6 bg-white border rounded-lg shadow-sm">
          <div className="flex justify-between mb-8">
            {/* Order ID & Date */}
            <div>
              <h2 className="text-xl font-semibold">
                Order ID: {checkout._id}
              </h2>
              <p className="text-gray-600">
                Order Date: {new Date(checkout.createdAt).toLocaleDateString()}
              </p>
            </div>
            {/* Estimated Delivery */}
            <div>
              <p className="text-sm text-emerald-500">
                Estimated Delivery: {calculateEstimatedDelivery(checkout.createdAt)}
              </p>
            </div>
          </div>

          {/* Ordered Items */}
          <div className="mb-8">
            {checkout.checkoutItems && checkout.checkoutItems.length > 0 ? (
              checkout.checkoutItems.map((item) => (
                <div key={item.productId} className="flex items-center mb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="object-cover w-16 h-16 mr-4 rounded-md"
                  />
                  <div>
                    <h4 className="font-semibold text-md">{item.name}</h4>
                    <p className="text-sm text-gray-500">
                      {item.color} | {item.size}
                    </p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-md">${item.price}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No items found in your order.</p>
            )}
          </div>

          {/* Payment & Delivery Info */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <div className="mb-2 text-lg font-semibold">Payment</div>
              <p className="text-gray-600">Paypal</p>
            </div>
            <div>
              <h4 className="mb-2 font-semibold">Delivery</h4>
              <p className="text-gray-600">{checkout.shippingAddress.address}</p>
              <p className="text-gray-600">
                {checkout.shippingAddress.city}, {checkout.shippingAddress.country}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmationPage;
