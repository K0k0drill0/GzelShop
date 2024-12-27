import React, { useEffect, useState } from "react";
import { getOrders } from "../utils/Fetches";
import "../styles/OrderList.css";

const OrderList = () => {
    const [orders, setOrders] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        const fetchOrders = async () => {
            const token = localStorage.getItem("authToken");
            if (!token) {
                navigate("/");
                return;
            }

            try {
                const data = await getOrders(token);
                console.log(data.order_list);
                setOrders(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) {
        return <p className="loading-message">Loading...</p>;
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    return (
        <div className="order-list-page">
            <h2 className="order-list-heading">Previous Orders</h2>
            {orders.order_list.length === 0 ? (
                <p className="no-orders-message">
                    You didn't order anything yet
                </p>
            ) : (
                <div className="order-list-container">
                    {orders.order_list.map((order, index) => (
                        <div className="order-card" key={index}>
                            <h3 className="order-id">
                                Order
                            </h3>
                            <div className="order-items">
                                {order.order_items.map((item, itemIndex) => (
                                    <div className="order-item" key={itemIndex}>
                                        <h4 className="product-name">
                                            {item.product_name}
                                        </h4>
                                        <p className="product-price">
                                            Price: ${item.price}
                                        </p>
                                        <p className="product-quantity">
                                            Quantity: {item.quantity}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderList;
