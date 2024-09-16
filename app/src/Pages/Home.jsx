import React from 'react'
import './Home.css'
import 'bootstrap/dist/css/bootstrap.css';
import TaskList from '../Components/TaskList/TaskList';
import TaskCreateModal from '../Components/Modal/TaskCreateModal/TaskCreateModal';
import TaskUpdateModal from '../Components/Modal/TaskUpdateModal/TaskUpdateModal';
import Navbar from '../Components/Navbar/Navbar';
import Tasks from '../Components/Dashboard/Tasks';
import CompletedTasks from '../Components/Dashboard/CompletedTasks/CompletedTasks';
import UncompletedTasks from '../Components/Dashboard/UncompletedTasks/UncompletedTasks';
import SearchedTasks from '../Components/Dashboard/SearchedTasks/SearchedTasks';
import { useState } from 'react'



function Home() {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showTaskList, setShowTaskList] = useState(true);
    const [showCompletedTaskList, setShowCompletedTaskList] = useState(false);
    const [showUncompletedTaskList, setShowUncompletedTaskList] = useState(false);
    const [showSearchTaskList, setShowSearchTaskList] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [searchValue, setSearchValue] = useState('');
  
    const handleCreateTaskClick = () => {
      setShowCreateModal(true);
      setShowTaskList(false);
      setShowUpdateModal(false);
      setShowCompletedTaskList(false);
      setShowUncompletedTaskList(false);
      setShowSearchTaskList(false);
    };
  
    const handleUpdateTaskClick = (taskId) => {
      setSelectedTaskId(taskId);
      setShowUpdateModal(true);
      setShowTaskList(false);
      setShowCreateModal(false);
      setShowCompletedTaskList(false);
      setShowUncompletedTaskList(false);
      setShowSearchTaskList(false);

    };
  
    const handleAllTaskClick = () => {
      setShowTaskList(true);
      setShowCreateModal(false);
      setShowUpdateModal(false);
      setShowCompletedTaskList(false);
      setShowUncompletedTaskList(false);
      setShowSearchTaskList(false);

    };

    const handleCompletedTaskClick = () => {
      setShowTaskList(false);
      setShowCreateModal(false);
      setShowUpdateModal(false);
      setShowCompletedTaskList(true);
      setShowUncompletedTaskList(false);
      setShowSearchTaskList(false);

    };

    const handleUncompletedTaskClick = () => {
      setShowTaskList(false);
      setShowCreateModal(false);
      setShowUpdateModal(false);
      setShowCompletedTaskList(false);
      setShowSearchTaskList(false);
      setShowUncompletedTaskList(true);
    };

    const handleSearchTaskClick = (value) => {
      setShowTaskList(false);
      setShowCreateModal(false);
      setShowUpdateModal(false);
      setShowCompletedTaskList(false);
      setShowUncompletedTaskList(false);
      setShowSearchTaskList(true);
      setSearchValue(value);
    };
   
    let subContent; 
  
    if(showTaskList == true){
      subContent = <TaskList onUpdateTaskClick={handleUpdateTaskClick}/>;
    }else if(showCreateModal == true){
      subContent = <TaskCreateModal onClose={handleAllTaskClick}/>;
    }else if(showUpdateModal == true){
      subContent = <TaskUpdateModal taskId={selectedTaskId} onClose={handleAllTaskClick}/>;
    }else if(showCompletedTaskList == true){
      subContent = <CompletedTasks onUpdateTaskClick={handleUpdateTaskClick} onClose={handleAllTaskClick}/>;
    }else if(showUncompletedTaskList == true){
      subContent = <UncompletedTasks onUpdateTaskClick={handleUpdateTaskClick} onClose={handleAllTaskClick}/>;
    }else if(showSearchTaskList == true){
      subContent = <SearchedTasks searchValue={searchValue} onUpdateTaskClick={handleUpdateTaskClick} onClose={handleAllTaskClick}/>;
    }
    
  return (
    <section className='mainContainer'>
        <div className="row">
            <Navbar onSearchTaskClick={handleSearchTaskClick}/>
        </div>
        <div className="row">
            <div className="col-3">
                <Tasks onCreateTaskClick={handleCreateTaskClick} onAllTaskClick={handleAllTaskClick} onCompletedTaskClick={handleCompletedTaskClick} onUncompletedTaskClick={handleUncompletedTaskClick}/>
            </div>
            <div className="col-9 taskList">
                {subContent}
            </div>
        </div>
    </section>
  )
}

export default Home