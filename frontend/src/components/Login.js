import React, { useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../utils/Fetches";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await postLogin(login, navigate, email, password);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = () => {
        navigate("/register");
    };

    const handleSellerLogin = () => {
        navigate("/seller/login");
    };

    return (
        <div className="login-container">
            <div className="form-container">
                <h2 className="title">Login</h2>
                <form onSubmit={handleLogin} className="login-form">
                    <div className="input-container">
                        <label htmlFor="email" className="input-label">
                            Email
                        </label>
                        <input
                            maxLength="255" 
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="input-field"
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="password" className="input-label">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="input-field"
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    {loading && <p className="loading-message">Loading...</p>}
                    <button type="submit" className="submit-btn">
                        Login
                    </button>
                    <button
                        type="button"
                        onClick={handleSellerLogin}
                        className="secondary-btn"
                    >
                        Login as seller
                    </button>
                    <button
                        type="button"
                        onClick={handleRegister}
                        className="secondary-btn"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
