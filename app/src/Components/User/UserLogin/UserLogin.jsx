import React from 'react'
import './UserLogin.css'
import { useState } from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom'; 



function UserLogin() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
    };
   
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.post('http://127.0.0.1:8000/login/', {
            username: formData.username,
            password: formData.password
          });
    
          const token = response.data.access;
          localStorage.setItem('authToken', token); 
          sessionStorage.setItem('authToken',token);
          setMessage('Login Successful');

          if(sessionStorage.getItem('authToken') != null){
            navigate('/home'); 
          }
         
    
        } catch (error) {
          setMessage('Login Failed. Please check your credentials and try again.');
          console.error('Error:', error.response || error.message);
        }
    };
   

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            placeholder="Enter your username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
        <div className='div-link'>
            <a href="/register">Create Account</a>
        </div>
      {message && <p className="status-message">{message}</p>}
    </div>
  )
}

export default UserLogin