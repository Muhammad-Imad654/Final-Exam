import React from "react";
import { IoClose } from "react-icons/io5";
import CartContents from "../Cart/CardContent"; // Corrected import
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Cart = ({ draweropen, toggleCartDrawer }) => {
  const navigate = useNavigate();
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const userId = user ? user._id : null;

  const handleCheckOut = () => {
    toggleCartDrawer();
    if (!user) {
      navigate("/login?redirect=checkout");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <>
      {/* Overlay for better UX */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 transition-opacity duration-300 ${draweropen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={toggleCartDrawer}
      ></div>

      {/* Cart Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-3/4 sm:w-1/2 md:w-[32rem] bg-white shadow-xl transform transition-transform duration-300 flex flex-col z-50 ${draweropen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Close Button */}
        <div className="flex items-center justify-between p-4 border-b shadow-sm">
          <h2 className="text-lg font-semibold">Shopping Cart</h2>
          <button type="button" onClick={toggleCartDrawer}>
            <IoClose className="w-6 h-6 text-gray-700 transition hover:text-gray-900" />
          </button>
        </div>

        {/* Cart Items Section */}
        <div className="flex-grow p-4 overflow-y-auto">
          <p className="text-gray-500">Your cart</p>

          {cart && cart?.products?.length > 0 ? (
            <CartContents cart={cart} userId={userId} guestId={guestId} />
          ) : (
            <p>Your cart is empty</p>
          )}
        </div>

        {/* Checkout Button */}
        <div className="sticky bottom-0 p-4 border-t shadow-sm">
          {cart && cart?.products?.length > 0 && (
            <>
              <button
                onClick={handleCheckOut}
                className="w-full py-2 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Proceed to Checkout
              </button>
              <div className="mt-2 text-sm tracking-tighter text-center text-gray-500">
                !! Shipping, taxes, and discount calculated !!
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
