import React, { useState } from 'react';
import axios from 'axios';
import './UserRegistration.css';
import { useNavigate } from 'react-router-dom'; 


function UserRegistration() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({});  
    const [message, setMessage] = useState(''); 
    const navigate = useNavigate(); 

    // Handle input change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Validate the form
    const validate = () => {
        let errors = {};

        if (!formData.username) {
            errors.username = 'Username is required';
        }

        if (!formData.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email address is invalid';
        }

        if (!formData.password) {
            errors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }

        if (!formData.confirmPassword) {
            errors.confirmPassword = 'Please confirm your password';
        } else if (formData.confirmPassword !== formData.password) {
            errors.confirmPassword = 'Passwords do not match';
        }

        return errors;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                const response = await axios.post('http://127.0.0.1:8000/register/', {
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    confirm_password: formData.confirmPassword
                });

                const token = response.data.access; 
                localStorage.setItem('authToken', token); 
                sessionStorage.setItem('authToken',token);
                // If registration is successful
                setMessage('Registration Successful!');
                console.log('Response:', response.data);

                if(sessionStorage.getItem('authToken') != null){
                    navigate('/home'); 
                }
               
               
                // Reset form
                setFormData({
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                });
            } catch (error) {
                setMessage('Registration Failed. Please try again.');
                console.error('Error:', error.response || error.message);
            }
        }
    };

    return (
        <div className="registration-container">
            <h2>User Registration</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className={errors.username ? 'input-error' : ''}
                        placeholder="Enter your username"
                    />
                    {errors.username && <p className="error-message">{errors.username}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? 'input-error' : ''}
                        placeholder="Enter your email"
                    />
                    {errors.email && <p className="error-message">{errors.email}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={errors.password ? 'input-error' : ''}
                        placeholder="Enter your password"
                    />
                    {errors.password && <p className="error-message">{errors.password}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={errors.confirmPassword ? 'input-error' : ''}
                        placeholder="Confirm your password"
                    />
                    {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
                </div>
                <button type="submit">Register</button>
            </form>
            <div className='div-register-link'>
                <a href="/" >Login</a>
            </div>
            {message && <p className="status-message">{message}</p>}
        </div>
    );
}

export default UserRegistration;
