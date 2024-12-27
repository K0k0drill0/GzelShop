import React, { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../utils/Fetches";
import "../styles/Profile.css";
import { useNavigate } from "react-router-dom";
import OrderList from "./OrderList";

const Profile = () => {
    const [profile, setProfile] = useState({
        full_name: null,
        phone: null,
        email: "",
        birthday: null,
        city: null,
        street: null,
        house: null,
        building: null,
        entrance: null,
        apartment: null,
        floor: null,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editing, setEditing] = useState({
        full_name: false,
        phone: false,
        email: false,
        birthday: false,
        address: false,
    });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            navigate("/");
        }

        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await getProfile(token);
                setProfile(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleEdit = (field) => {
        setEditing((prev) => ({ ...prev, [field]: true }));
    };

    const closeEdit = (field) => {
        setEditing((prev) => ({ ...prev, [field]: false }));
    };

    const handleChange = (field, value) => {
        setProfile((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        const token = localStorage.getItem("authToken");
        try {
            await updateProfile(token, profile);
            alert("Profile updated successfully");
        } catch (err) {
            setError("Error updating profile: " + err.message);
        } finally {
            setLoading(false);
        }
        closeEdit("full_name");
        closeEdit("phone");
        closeEdit("email");
        closeEdit("birthday");
        closeEdit("address");
    };

    const renderAddress = () => {
        const { city, street, house, building, entrance, apartment, floor } =
            profile;
        return `${city || "-"} ${street || "-"} ${house || "-"} ${
            building || "-"
        } ${entrance || "-"} ${apartment || "-"} ${floor || "-"}`.trim();
    };

    if (loading) {
        return <p className="loading-message">Loading...</p>;
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    return (
        <div className="profile-page">
            <h2 className="profile-heading">Your Profile</h2>
            <div className="profile-container">
                <div className="profile-field">
                    <label className="profile-label">Name</label>
                    <div className="profile-value">
                        {editing.full_name ? (
                            <input
                                maxLength="255"
                                type="text"
                                value={profile.full_name || ""}
                                onChange={(e) =>
                                    handleChange("full_name", e.target.value)
                                }
                                className="profile-input"
                            />
                        ) : (
                            <span>
                                {profile.full_name || "No name provided"}
                            </span>
                        )}
                        <button
                            className="profile-edit-btn"
                            onClick={() => handleEdit("full_name")}
                        >
                            Edit
                        </button>
                    </div>
                </div>

                <div className="profile-field">
                    <label className="profile-label">Phone</label>
                    <div className="profile-value">
                        {editing.phone ? (
                            <input
                                maxLength="20"
                                type="text"
                                value={profile.phone || ""}
                                onChange={(e) =>
                                    handleChange("phone", e.target.value)
                                }
                                className="profile-input"
                            />
                        ) : (
                            <span>
                                {profile.phone || "No phone number provided"}
                            </span>
                        )}
                        <button
                            className="profile-edit-btn"
                            onClick={() => handleEdit("phone")}
                        >
                            Edit
                        </button>
                    </div>
                </div>

                <div className="profile-field">
                    <label className="profile-label">Email</label>
                    <div className="profile-value">
                        <span>{profile.email || "No email provided"}</span>
                        <button
                            className="profile-edit-btn"
                            onClick={() => handleEdit("email")}
                        >
                            Edit
                        </button>
                    </div>
                </div>

                <div className="profile-field">
                    <label className="profile-label">Birthday</label>
                    <div className="profile-value">
                        {editing.birthday ? (
                            <input
                                type="date"
                                value={profile.birthday || ""}
                                onChange={(e) =>
                                    handleChange("birthday", e.target.value)
                                }
                                className="profile-input"
                            />
                        ) : (
                            <span>
                                {profile.birthday || "No birthday provided"}
                            </span>
                        )}
                        <button
                            className="profile-edit-btn"
                            onClick={() => handleEdit("birthday")}
                        >
                            Edit
                        </button>
                    </div>
                </div>

                <div className="profile-field">
                    <label className="profile-label">Address</label>
                    <div className="profile-value">
                        {editing.address ? (
                            <div className="adress-view">
                                <input
                                    maxLength="255"
                                    type="text"
                                    value={profile.city || ""}
                                    onChange={(e) =>
                                        handleChange("city", e.target.value)
                                    }
                                    placeholder="City"
                                    className="profile-input"
                                />
                                <input
                                    maxLength="255"
                                    type="text"
                                    value={profile.street || ""}
                                    onChange={(e) =>
                                        handleChange("street", e.target.value)
                                    }
                                    placeholder="Street"
                                    className="profile-input"
                                />
                                <input
                                    maxLength="20"
                                    type="text"
                                    value={profile.house || ""}
                                    onChange={(e) =>
                                        handleChange("house", e.target.value)
                                    }
                                    placeholder="House"
                                    className="profile-input"
                                />
                                <input
                                    maxLength="20"
                                    type="text"
                                    value={profile.building || ""}
                                    onChange={(e) =>
                                        handleChange("building", e.target.value)
                                    }
                                    placeholder="Building"
                                    className="profile-input"
                                />
                                <input
                                    maxLength="20"
                                    type="text"
                                    value={profile.entrance || ""}
                                    onChange={(e) =>
                                        handleChange("entrance", e.target.value)
                                    }
                                    placeholder="Entrance"
                                    className="profile-input"
                                />
                                <input
                                    maxLength="20"
                                    type="text"
                                    value={profile.apartment || ""}
                                    onChange={(e) =>
                                        handleChange("apartment", e.target.value)
                                    }
                                    placeholder="Apartment"
                                    className="profile-input"
                                />
                                <input
                                    maxLength="20"
                                    type="text"
                                    value={profile.floor || ""}
                                    onChange={(e) =>
                                        handleChange("floor", e.target.value)
                                    }
                                    placeholder="Floor"
                                    className="profile-input"
                                />
                            </div>
                        ) : (
                            <span>{renderAddress()}</span>
                        )}
                        <button
                            className="profile-edit-btn"
                            onClick={() => handleEdit("address")}
                        >
                            Edit
                        </button>
                    </div>
                </div>

                <div className="profile-submit-container">
                    <button
                        className="profile-submit-btn"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            </div>
            <OrderList />
        </div>
    );
};

export default Profile;
