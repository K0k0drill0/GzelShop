import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import "../styles/Menu.css";
import { MdOutlineBackup } from "react-icons/md";
import { backup } from "../utils/Fetches";

export const getNavigateMenu = () => {
    const { isAuthenticated, logout, userType } = useAuth();
    const [error, setError] = useState(null);

    const doBackUp = async () => {
        try {
            const token = localStorage.getItem("authToken");
            await backup(token);
        } catch (error) {
            setError(error.message);
        }
    };

    if (error) {
        return <p className="error">{error}</p>;
    }

    return (
        <nav className="menu-container">
            <Link className="menu-link" to="/">
                Products
            </Link>
            {isAuthenticated && userType === "customer" && (
                <Link className="menu-link" to="/cart">
                    Cart
                </Link>
            )}
            {isAuthenticated && userType === "customer" && (
                <Link className="menu-link" to="/profile">
                    Profile
                </Link>
            )}
            {isAuthenticated && userType === "seller" && (
                <Link className="menu-link" to="/new_product">
                    Create product
                </Link>
            )}
            {isAuthenticated && userType == "seller" && (
                <Link to="/backups" className="menu-link">
                    <MdOutlineBackup /> BackUps
                </Link>
            )}
            {isAuthenticated && userType == "seller" && (
                <Link to="#" className="menu-link" onClick={() => doBackUp()}>
                    <MdOutlineBackup /> Do BackUp
                </Link>
            )}
            {!isAuthenticated && (
                <Link className="menu-link" to="/login">
                    Login
                </Link>
            )}
            {isAuthenticated && (
                <Link className="menu-link" to="#" onClick={logout}>
                    Logout
                </Link>
            )}
        </nav>
    );
};
