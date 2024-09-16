import React from 'react';
import './UncompletedTasks.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';


function UncompletedTasks({onUpdateTaskClick}) {

    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
        try {
            const token = localStorage.getItem('authToken');

            // API call
            const response = await axios.get('http://127.0.0.1:8000/tasks/false/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
            });

            // Set the response data in state
            setData(response.data);
            console.log("data --> ",response.data);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    fetchData();
  }, []);

    if (!data || data.length === 0) {
        return <p>No tasks...</p>;
    }

  return (
    <section className='container'>
        <div className='row task-List-Head'>
            <div className='col'>
                <h4 className='title-TaskList'>Uncompleted Tasks</h4>
            </div>       
        </div>
        <section className="main-right">
                {data.map((task) => (
                    <div className="main-right-tasks-item row"  onClick={() => {
                        onUpdateTaskClick(task.id);
                    }}>
                        <div className="col-10">
                            <h5 className="">{task.title}</h5>
                            <p className="col-11">{task.description}</p>
                        </div>
                        <div className="col d-flex justify-content-end align-items-center">
                            <input className="form-check-input check-done" type="checkbox" id="checkboxNoLabel" value="" checked={task.status} aria-label="..."></input>
                        </div>
                    </div>
                ))}
        </section>  
    </section>
  )
}

export default UncompletedTasks