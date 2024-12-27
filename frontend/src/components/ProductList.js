import "../styles/ProductList.css";
import { useAuth } from "../contexts/AuthContext";
import { postCart } from "../utils/Fetches";
import { getProducts } from "../utils/Fetches";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
    const { isAuthenticated, userType } = useAuth();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const handleCardClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    const categories = products?.categories || [];

    const handleAddToCart = async (productId) => {
        if (!isAuthenticated) {
            alert("You must be logged in to add products to the cart");
            return;
        }

        const token = localStorage.getItem("authToken");
        if (!token) {
            alert("User is not authenticated");
            return;
        }

        try {
            await postCart(productId, token);
            alert("Product was added to cart");
        } catch (err) {
            alert(err.message);
        }
    };

    const fetchProducts = async () => {
        try {
            await getProducts(setProducts);
        } catch (error) {
            alert("Error fetching products");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) {
        return <p className="loading-message">Loading...</p>;
    }

    return (
        <div className="product-list-container">
            {categories.map((category) => {
                if (category.products.length > 0) {
                    return (
                        <div className="category-container" key={category.name}>
                            <h3 className="category-title">{category.name}</h3>
                            <p className="category-description">
                                {category.description}
                            </p>
                            <div className="products-container">
                                {category.products.map((product) => (
                                    <div
                                        className="product-card"
                                        key={product.name}
                                    >
                                        <img
                                            className="product-image"
                                            src={`data:image/png;base64,${product.image}`}
                                            alt="Product"
                                        />
                                        <h4
                                            className="product-name"
                                            onClick={() =>
                                                handleCardClick(product.id)
                                            }
                                        >
                                            {product.name}
                                        </h4>
                                        <p className="product-description">
                                            {product.description}
                                        </p>
                                        <p className="product-price">
                                            Price: ${product.price}
                                        </p>
                                        <p className="product-stock">
                                            In stock: {product.quantity}
                                        </p>
                                        {product.quantity !== 0 ? (
                                            userType !== "seller" && (
                                                <button
                                                    className="add-to-cart-btn"
                                                    onClick={() =>
                                                        handleAddToCart(
                                                            product.id
                                                        )
                                                    }
                                                >
                                                    Add to Cart
                                                </button>
                                            )
                                        ) : (
                                            <div>
                                                {userType !== "seller" && (
                                                    <p className="out-of-stock">
                                                        Out of stock
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                }
            })}

            {products.length === 0 && (
                <p className="no-products-message">No products available.</p>
            )}
        </div>
    );
};

export default ProductList;
