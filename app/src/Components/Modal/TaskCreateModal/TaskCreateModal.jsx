import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './TaskCreateModal.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';


function TaskCreateModal({ onClose }) {

  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const navigate = useNavigate();
  const [message, setMessage] = useState(''); 

  // Handle form input changes and update state
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value, 
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
     
      const token = localStorage.getItem('authToken');
      if (!token) {
        setMessage('User is not authenticated.');
        console.error('User is not authenticated.');
        return;
      }

      // API call
      const response = await axios.post(
        'http://127.0.0.1:8000/tasks/', // API endpoint
        {
          title: formData.title,
          description: formData.description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in Authorization header
          },
        }
      );

      // Handle successful response
      console.log('Task created successfully:', response.data);
      const data = response.data;
      if (data) {
        setMessage('Task created successfully!');  
        setTimeout(() => {
          navigate('/home');
        }, 2000);
      }

      
      onClose(); 
    } catch (error) {
      if (error.response) {
        console.error('Error from server:', error.response.data);
      } else {
        console.error('Request failed:', error.message);
      }
    }
  };
  return (
    <div className="TaskCreateModal-Container">
      <form onSubmit={handleSubmit}>
          <div className="row">
              <div className="col">
                  <p className='TaskCreateModal-heading'>Create Task</p>
              </div>
          </div>
          <div className="row TaskCreateModal-field">
              <label htmlFor="title" className='col-2 text-end'>Title</label>
              <input
                  className="form-control col-10 TaskCreateModal-input-fields d-flex justify-content-end"
                  type="text"
                  id="title"
                  placeholder=""
                  onChange={handleChange}
                  aria-label="Task Name"
                  required
              />
          </div>
          <div className="row TaskCreateModal-field">
              <label htmlFor="description" className="form-label col-2 text-end">Description</label>
              <textarea
                  className="form-control col-10 TaskCreateModal-input-fields d-flex justify-content-end"
                  id="description"
                  rows="3"
                  aria-label="Task Description"
                  onChange={handleChange}
                  required
              ></textarea>
          </div>
          <div className="row TaskCreateModal-btn">
              <button
                  className="btn col-1 TaskCreateModal-btn-close"
                  type="button"
                  onClick={onClose}
              >
                  Close
              </button>
              <button
                  className="btn col-1 TaskCreateModal-btn-save"
                  type="submit"
              >
                  Save
              </button>
          </div>
      </form>
      {message && (
        <div className="message-section">
          <p>{message}</p>
        </div>
      )}
    </div>

  )
}

export default TaskCreateModal