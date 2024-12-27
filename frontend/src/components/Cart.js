import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteCartItem, getCart, postOrder } from "../utils/Fetches";
import "../styles/Cart.css";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchCartData = async () => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            navigate("/");
            return;
        }

        try {
            await getCart(token, setCartItems);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCartData();
    }, []);

    const removeCartItem = async (itemId) => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            navigate("/");
        }
        try {
            console.log(itemId);
            await deleteCartItem(token, itemId, setCartItems);
            await fetchCartData();
        } catch (err) {
            alert(err.message);
        }
    };

    const submitOrder = async () => {
        setLoading(true);
        const token = localStorage.getItem("authToken");
        if (!token) {
            navigate("/");
        }
        try {
            await postOrder(token);
            alert("Order was created. Check your profile");
            getCart(token, setCartItems);
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p className="loading-message">Loading...</p>;
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    return (
        <div className="cart-page">
            <div className="cart-container">
                <h2 className="cart-title">Your Cart</h2>
                {cartItems.length === 0 ? (
                    <p className="empty-cart-message">Your cart is empty</p>
                ) : (
                    <div>
                        <ul className="cart-items">
                            {cartItems.map((item) => (
                                <li className="cart-item" key={item.product_id}>
                                    <h4
                                        onClick={() =>
                                            navigate(
                                                `/product/${item.product_id}`
                                            )
                                        }
                                    >
                                        {item.product_name}
                                    </h4>
                                    <p>Price: ${item.price}</p>
                                    <p>In cart: {item.quantity}</p>
                                    <p>In stock: {item.warehouse_quantity}</p>
                                    <button
                                        className="delete-btn"
                                        onClick={() =>
                                            removeCartItem(item.product_id)
                                        }
                                    >
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <button
                            className="submit-btn"
                            onClick={() => submitOrder()}
                        >
                            Submit Order
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
