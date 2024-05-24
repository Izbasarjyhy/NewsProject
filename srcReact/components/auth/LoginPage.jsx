// LoginPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../service/UserService";
import "./LoginPage.css"; // Импорт файла стилей

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [update, setUpdate] = useState(false); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userData = await UserService.login(email, password);
            console.log(userData);
            if (userData.token) {
                localStorage.setItem('token', userData.token);
                localStorage.setItem('role', userData.role);
                setUpdate(true); 
            } else {
                setError(userData.message);
            }
        } catch (error) {
            console.log(error);
            setError(error.message);
            setTimeout(() => {
                setError('');
            }, 5000);
        }
    }

    useEffect(() => {
        if (update) {
            navigate('/profile'); 
            setUpdate(false);
            window.location.reload();
        }
    }, [update, navigate]);

    return (
        <div className="auth-container">
            <h2 className="auth-title">Login</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                    <label className="form-label">Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" />
                </div>
                <div className="form-group">
                    <label className="form-label">Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-input" />
                </div>
                <button type="submit" className="submit-btn">Login</button>
            </form>
        </div>
    );
}

export default LoginPage;
