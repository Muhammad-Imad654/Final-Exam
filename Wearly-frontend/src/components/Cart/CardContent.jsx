import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { updateCartItemQuantity, removeFromCart } from './../../redux/slices/cartSlices';
import { useState } from "react";

const CartContents = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.cart);
  const [deletingItems, setDeletingItems] = useState([]);

  const handleAddToCart = (productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      dispatch(updateCartItemQuantity({
        productId,
        quantity: newQuantity,
        size,
        color,
        userId,
        guestId
      }));
    }
  };

  const handleRemoveFromCart = (productId, size, color) => {
    // Track which item is being deleted
    const itemKey = `${productId}-${size}-${color}`;
    setDeletingItems(prev => [...prev, itemKey]);
    
    dispatch(removeFromCart({ productId, size, color, userId, guestId }))
      .finally(() => {
        // Remove from deleting state when done
        setDeletingItems(prev => prev.filter(key => key !== itemKey));
      });
  };

  return (
    <div className="p-4">
      {cart.products.map((product) => {
        const itemKey = `${product.productId}-${product.size}-${product.color}`;
        const isDeleting = deletingItems.includes(itemKey);
        
        return (
          <div
            key={itemKey}
            className="flex items-start justify-between py-4 border-b"
          >
            {/* Product Info */}
            <div className="flex items-start">
              <img
                src={product.image}
                alt={product.name}
                className="object-cover w-20 h-24 mr-4 rounded"
              />
              <div>
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-500">
                  Size: {product.size} | Color: {product.color}
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center mt-2">
                  <button
                    onClick={() =>
                      handleAddToCart(
                        product.productId,
                        -1,
                        product.quantity,
                        product.size,
                        product.color
                      )
                    }
                    className="px-2 py-1 text-xl font-medium border rounded"
                    disabled={loading}
                  >
                    -
                  </button>
                  <span className="mx-4">{product.quantity}</span>
                  <button
                    onClick={() =>
                      handleAddToCart(
                        product.productId,
                        1,
                        product.quantity,
                        product.size,
                        product.color
                      )
                    }
                    className="px-2 py-1 text-xl font-medium border rounded"
                    disabled={loading}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Price & Delete */}
            <div className="text-right">
              <p>$ {product.price.toLocaleString()}</p>
              <button
                onClick={() =>
                  handleRemoveFromCart(
                    product.productId,
                    product.size,
                    product.color
                  )
                }
                disabled={isDeleting || loading}
                className="relative"
              >
                <RiDeleteBin3Line className={`w-6 h-6 mt-2 ${isDeleting ? 'text-gray-400' : 'text-red-500 hover:text-red-700'}`} />
                {isDeleting && (
                  <span className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                    <span className="w-3 h-3 border-t-2 border-red-500 border-r-2 rounded-full animate-spin"></span>
                  </span>
                )}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartContents;
