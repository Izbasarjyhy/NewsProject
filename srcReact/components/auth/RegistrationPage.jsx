// RegistrationPage.jsx
import React, { useState } from 'react';
import UserService from '../service/UserService';
import { useNavigate } from 'react-router-dom';
import './RegistrationPage.css'; // Импорт файла стилей

function RegistrationPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'USER',
        city: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await UserService.register(formData);

            if (response.statusCode === 200) {
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    role: 'USER',
                    city: ''
                });
                alert('Сәтті тіркелдіңіз!');
                navigate('/login');
                window.location.reload();
            } else {            
                alert(response.message);
            }
        } catch (error) {
            console.error('Error registering user:', error);
            alert('Сіздің тіркелуіңізде қателіктер бар');
        }
    };

    return (
        <div className="auth-container">
            <h2 className="auth-title">Registration</h2>
            <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                    <label className="form-label">Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="form-input" required />
                </div>
                <div className="form-group">
                    <label className="form-label">Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="form-input" required />
                </div>
                <div className="form-group">
                    <label className="form-label">Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleInputChange} className="form-input" required />
                </div>
                <div className="form-group">
                    <label className="form-label">City:</label>
                    <input type="text" name="city" value={formData.city} onChange={handleInputChange} className="form-input" placeholder="Enter your city" required />
                </div>
                <button type="submit" className="submit-btn">Register</button>
            </form>
        </div>
    );
}

export default RegistrationPage;
