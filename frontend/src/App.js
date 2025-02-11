import React from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import { AuthProvider } from "./contexts/AuthContext";
import Cart from "./components/Cart";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { getNavigateMenu } from "./components/Navigator";
import ProductList from "./components/ProductList";
import Profile from "./components/Profile";
import Product from "./components/Product";
import SellerLogin from "./components/SellerLogin";
import NewProduct from "./components/NewProduct";
import Backup from "./components/Backup";

const App = () => {
    return (
        <div className="app-container">
            {getNavigateMenu()}
            <div className="main-content">
                <Routes>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/backups" element={<Backup />} />
                    <Route path="/new_product" element={<NewProduct />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="seller/login" element={<SellerLogin />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/product/:productId" element={<Product />} />
                </Routes>
            </div>
        </div>
    );
};

const AppWrapper = () => (
    <Router>
        <AuthProvider>
            <App />
        </AuthProvider>
    </Router>
);

export default AppWrapper;
