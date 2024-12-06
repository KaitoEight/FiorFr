import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';

const OrderHistoryPage = () => {
    const [orders, setOrders] = useState([]);
    const { userInfo } = useContext(UserContext);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`https://jsm-contest.onrender.com/orders/${userInfo?.email}`, {
                    method: 'GET',
                });
                const data = await response.json();
                console.log(data);

                setOrders(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        if (userInfo?.email) {
            fetchOrders();
        }
    }, [userInfo?.email]);

    const cancelOrder = async (orderId) => {
        try {
            const response = await fetch(`https://jsm-contest.onrender.com/order/${orderId}/cancel`, {
                method: 'PUT',
            });

            if (response.ok) {
                const updatedOrder = await response.json();
                setOrders((prevOrders) =>
                    prevOrders.map((order) =>
                        order._id === updatedOrder.order._id ? updatedOrder.order : order
                    )
                );
            } else {
                console.error('Failed to cancel order');
            }
        } catch (error) {
            console.error('Error canceling order:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 h-screen overflow-y-auto mt-20">
            <h1 className="text-2xl font-bold mb-6 text-center">Your Orders</h1>
            {orders.length > 0 ? (
                <div className="bg-white rounded-lg shadow-md p-4">
                    {orders.map(order => (
                        <div key={order._id} className="border-b py-4 last:border-b-0">
                            <h2 className="font-semibold">Order ID: {order._id}</h2>
                            <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
                            {order.items.map(item => (
                                <div key={item.productId?._id}>
                                    <p>{item.productId?.name} - Quantity: {item?.quantity}</p>
                                </div>
                            ))}
                            <p>Total Price: ${order.totalPrice.toFixed(2)}</p>
                            <p className='bg-yellow-200 px-3 py-1'>Status: {order.status}</p>
                            <button
                                onClick={() => cancelOrder(order._id)}
                                className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 ease-in-out"
                            >
                                Cancel Order
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 text-lg text-center">No orders found.</p>
            )}
        </div>
    );
};

export default OrderHistoryPage;
