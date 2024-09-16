import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './TaskUpdateModal.css';
import { useState, useEffect } from 'react';
import axios from 'axios';


function TaskUpdateModal({ taskId, onClose }) {
    // function for Date Time Formating
    function formatDate(dateString) {
        if (!dateString) return 'N/A'; 
      
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'Invalid Date'; 
      
        const options = {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true, 
        };
      
        return new Intl.DateTimeFormat('en-US', options).format(date);
      }

    const [task, setTask] = useState({
        title: '',
        description: '',
        status: false,
      });
    
      useEffect(() => {
        const fetchTask = async () => {
          try {
            const token = localStorage.getItem('authToken');
             // API call
            const response = await axios.get(`http://127.0.0.1:8000/tasks/${taskId}/`, {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            });
            setTask(response.data);
          } catch (error) {
            console.error("Error fetching task", error);
          }
        };
    
        if (taskId) {
          fetchTask();
        }
      }, [taskId]);
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const token = localStorage.getItem('authToken');
           // API call
          await axios.put(`http://127.0.0.1:8000/tasks/${taskId}/`, task, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          onClose(); 
        } catch (error) {
          console.error('Error updating task:', error);
        }
      };
      
      const handleDelete = async () => {
        try {
          const token = localStorage.getItem('authToken');
          // API call
          await axios.delete(`http://127.0.0.1:8000/tasks/${taskId}/`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          onClose(); 
        } catch (error) {
          console.error('Error deleting task:', error);
        }
    };

    const formattedCreatedAt = formatDate(task.created_at);
    const formattedUpdatedAt = formatDate(task.updated_at);

    if (!task) return null;


  return (
    <div className="TaskUpdateModal-Container">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col">
            <p className='TaskUpdateModal-heading'>Update Task</p>
          </div>
        </div>
        <div className="row TaskUpdateModal-field">
          <label htmlFor="TaskName" className='col-2 text-end'>Title</label>
          <input
            className="form-control col-10 TaskUpdateModal-input-fields d-flex justify-content-end"
            type="text"
            id="TaskName"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            required
          />
        </div>
        <div className="row TaskUpdateModal-field">
          <label htmlFor="description" className="form-label col-2 text-end">Description</label>
          <textarea
            className="form-control col-10 TaskUpdateModal-input-fields d-flex justify-content-end"
            id="description"
            rows="3"
            value={task.description}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            required
          ></textarea>
        </div>
        <div className="row TaskUpdateModal-field">
          <label htmlFor="status" className="form-label col-2 text-end">Status</label>
          <input
            className="form-check-input col-10 d-flex justify-content-end"
            type="checkbox"
            id="status"
            checked={task.status}
            onChange={(e) => setTask({ ...task, status: e.target.checked })}
          />
        </div>
        <div className="row TaskUpdateModal-field">
          <label htmlFor="createdat" className="form-label col-2 text-end">Create At</label>
          <p className='col-10 d-flex justify-content-end"'>{formattedCreatedAt}</p>
        </div>
        <div className="row TaskUpdateModal-field">
          <label htmlFor="updatedat" className="form-label col-2 text-end">Updated At</label>
          <p className='col-10 d-flex justify-content-end"'>{formattedUpdatedAt}</p>
        </div>
        <div className="row TaskUpdateModal-btn">
          <button
            className="btn col-1 TaskUpdateModal-btn-close"
            type="button"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="btn col-1 TaskUpdateModal-btn-delete"
            type="button"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className="btn col-1 TaskUpdateModal-btn-update"
            type="submit"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  )
}

export default TaskUpdateModal