import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';

import './Tasks.css'

function Tasks({ onCreateTaskClick, onAllTaskClick, onCompletedTaskClick, onUncompletedTaskClick }) {
  return (
    <section className="main-left">
        <div className="main-left-item row" onClick={onCreateTaskClick}>                   
            <p>Create Tasks</p>
        </div>
        <div className="main-left-item row" onClick={onAllTaskClick}>                   
            <p>All Tasks</p>
        </div>
        <div className="main-left-item row" onClick={onUncompletedTaskClick}>               
            <p>Uncompleted Tasks</p>               
        </div>
        <div className="main-left-item row" onClick={onCompletedTaskClick}>
            <p>Completed Tasks</p>
        </div>
    </section>
  )
}

export default Tasks