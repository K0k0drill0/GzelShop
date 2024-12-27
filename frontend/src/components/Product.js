import "../styles/Product.css";
import { useAuth } from "../contexts/AuthContext";
import {
    postCart,
    getProduct,
    deleteProduct,
    updateProduct,
} from "../utils/Fetches";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Product = () => {
    const { productId } = useParams();
    const { isAuthenticated, userType } = useAuth();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imageLoading, setImageLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editing, setEditing] = useState(false);
    const navigate = useNavigate();

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
            setError(error.message);
        }
    };

    const fetchProduct = async (productId) => {
        setLoading(true);
        try {
            const data = await getProduct(productId);
            setProduct(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const removeProduct = async (productId) => {
        setLoading(true);
        try {
            await deleteProduct(productId);
            navigate("/");
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        const token = localStorage.getItem("authToken");
        try {
            await updateProduct(token, product);
            alert("Product updated successfully");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
        setEditing(false);
    };

    const handleImageChange = (e) => {
        setImageLoading(true);
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Закодировать файл в base64
                const imageBase64 = reader.result.split(",")[1]; // Убираем префикс "data:image/*;base64,"
                setProduct((prevProduct) => ({
                    ...prevProduct,
                    image: imageBase64,
                }));
            };
            reader.onerror = () => setError("Error reading file.");
            reader.readAsDataURL(file); // Преобразуем файл в ArrayBuffer
        }
        setImageLoading(false);
    };

    const handleChange = (field, value) => {
        setProduct((prev) => ({ ...prev, [field]: value }));
    };

    const handleEdit = () => {
        setEditing(true);
    };

    useEffect(() => {
        fetchProduct(productId);
    }, []);

    if (loading) {
        return <p className="loading-message">Loading...</p>;
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    return (
        <div className="product-page">
            <div className="product-container">
                {userType === "seller" && editing ? (
                    <div className="image-upload-container">
                        <input
                            type="file"
                            id="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        <label htmlFor="file" className="file-label">
                            {product.image ? "Change photo" : "Choose a photo"}
                        </label>
                        {product.image && <p>File selected</p>}
                    </div>
                ) : (
                    <img
                        className="product-image"
                        src={`data:image/png;base64,${product.image}`}
                        alt={"Product image"}
                    />
                )}
                {imageLoading && (
                    <p className="loading-message">Loading image...</p>
                )}
                <div className="product-info">
                    {userType === "seller" && editing ? (
                        <input
                            maxLength="255" 
                            className="product-input"
                            type="text"
                            value={product.name || ""}
                            onChange={(e) =>
                                handleChange("name", e.target.value)
                            }
                        />
                    ) : (
                        <h4 className="product-title">{product.name}</h4>
                    )}
                    {userType === "seller" && editing ? (
                        <textarea
                            className="product-input"
                            value={product.description || ""}
                            onChange={(e) =>
                                handleChange("description", e.target.value)
                            }
                        />
                    ) : (
                        <p className="product-description">
                            {product.description}
                        </p>
                    )}
                    {userType === "seller" && editing ? (
                        <input
                            className="product-input"
                            type="number"
                            min="0.01"
                            step="0.01"
                            value={product.price || ""}
                            onChange={(e) =>
                                handleChange("price", e.target.value)
                            }
                        />
                    ) : (
                        <p className="product-price">Price: ${product.price}</p>
                    )}
                    {userType === "seller" && editing ? (
                        <input
                            className="product-input"
                            type="number"
                            value={product.quantity || ""}
                            onChange={(e) =>
                                handleChange("quantity", e.target.value)
                            }
                        />
                    ) : (
                        <p className="product-stock">
                            In stock: {product.quantity}
                        </p>
                    )}
                    {product.quantity !== 0 ? (
                        userType !== "seller" && (
                            <button
                                className="add-to-cart-btn"
                                onClick={() => handleAddToCart(product.id)}
                            >
                                Add to Cart
                            </button>
                        )
                    ) : (
                        <div className="out-of-stock-container">
                            {userType !== "seller" && <p>Out of stock</p>}
                        </div>
                    )}
                </div>
                <div className="action-buttons">
                    {userType == "seller" && !editing && (
                        <button
                            className="action-btn edit-btn"
                            onClick={() => handleEdit()}
                        >
                            Edit
                        </button>
                    )}
                    {userType == "seller" && editing && (
                        <button
                            className="action-btn submit-btn"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    )}
                    {userType == "seller" && (
                        <button
                            className="action-btn delete-btn"
                            onClick={() => removeProduct(product.id)}
                        >
                            Delete
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Product;
