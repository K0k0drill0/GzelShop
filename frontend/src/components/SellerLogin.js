import React, { useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import { postSellerLogin } from "../utils/Fetches";
import { useAuth } from "../contexts/AuthContext";

const SellerLogin = () => {
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await postSellerLogin(login, navigate, nickname, password);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="form-container">
                <h2 className="title">Login</h2>
                <form onSubmit={handleLogin} className="login-form">
                    <div className="input-container">
                        <label htmlFor="nickname" className="input-label">
                            Nickname
                        </label>
                        <input
                            maxLength="255"
                            type="nickname"
                            id="nickname"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
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
                    {error && <p>{error}</p>}
                    {loading && <p>Loading...</p>}
                    <button type="submit" className="submit-btn">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SellerLogin;
