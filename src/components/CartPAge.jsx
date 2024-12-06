import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';

const CartPage = () => {
  const [cartItems, setCartItems1] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showOrderPopup, setShowOrderPopup] = useState(false); // State for order popup
  const { userInfo, setCartItems } = useContext(UserContext);

  useEffect(() => {
    const getCartItems = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://jsm-contest.onrender.com/cart/${userInfo?.email}`, {
          method: 'GET',
        });
        const itemsJson = await response.json();
        setCartItems1(itemsJson.cartItems);
        console.log(itemsJson.cartItems);
        setCartItems(itemsJson.cartItems);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      } finally {
        setLoading(false);
      }
    };

    getCartItems();
  }, [userInfo?.email, cartItems?.length]);

  const removeItemFromCart = async (productId) => {
    try {
      const response = await fetch('https://jsm-contest.onrender.com/cart/remove', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userInfo?.email, productId }),
      });
      if (response.ok) {
        const data = await response.json();
        setCartItems1(data.cartItems);
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleOrder = async () => {
    try {
      // Call API to place the order
      const response = await fetch('https://jsm-contest.onrender.com/order/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userInfo?.email, cartItems }),
      });

      if (response.ok) {
        // Clear the cart on successful order placement
        setCartItems1([]);
        // Show order success popup
        setShowOrderPopup(true);
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  const closeOrderPopup = () => {
    setShowOrderPopup(false);
  };

  const CartItem = ({ item }) => (
    <div className="flex flex-col border-b border-gray-200 py-4 last:border-b-0">
      <div className="flex items-start">
        <img
          src={item.productId?.imageUrl}
          alt={item.productId?.name}
          className="w-20 h-20 object-cover rounded-md mr-4"
        />
        <div className="flex-grow">
          <h2 className="text-lg font-semibold">{item.productId?.name}</h2>
          <p className="text-gray-600">Quantity: {item?.quantity}</p>
          <p className="text-gray-600">Price: ${item.productId?.price?.toFixed(2)}</p>
          <p className="text-gray-600">Total: ${(item.productId?.price * item?.quantity)?.toFixed(2)}</p>
        </div>
      </div>
      <button
        onClick={() => removeItemFromCart(item.productId?._id)}
        className="mt-2 bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition duration-300 ease-in-out self-start"
      >
        Remove
      </button>
    </div>
  );

  const total = cartItems?.reduce((sum, item) => sum + item.productId?.price * item?.quantity, 0);

  return (
    <div className="max-w-md mx-auto p-4 mt-20">
      <h1 className="text-2xl font-bold mb-6 text-center">Your Cart</h1>
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : cartItems.length > 0 ? (
        <div className="bg-white rounded-lg shadow-md p-4">
          {cartItems.map(item => (
            <CartItem key={item?._id} item={item} />
          ))}
          <div className="mt-4 text-right">
            <p className="text-xl font-bold">Total: ${total.toFixed(2)}</p>
          </div>
          <button
            onClick={handleOrder}
            className="mt-4 bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition duration-300"
          >
            Place Order
          </button>
        </div>
      ) : (
        <p className="text-gray-500 text-lg text-center">Your cart is empty.</p>
      )}

      {/* Order Success Popup */}
      {showOrderPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Order Placed Successfully!</h2>
            <p>Your order has been placed. Thank you for shopping with us!</p>
            <button
              onClick={closeOrderPopup}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
