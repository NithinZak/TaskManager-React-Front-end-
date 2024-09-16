import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom'; 


function Navbar({onSearchTaskClick}) {
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate(); 

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    console.log('Search value:', searchValue);
  };

  const handleButtonClick = () => {
    handleSearch();
    if (onSearchTaskClick) {
      onSearchTaskClick(searchValue);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };
     
  return (
    <nav className="side-padding row">
      <div className="col-2 div-heading">
        <p id="Heading" className="nav-left">TaskFlow</p>
      </div>
      <div className="col-8">
        <div className="nav-center">
          <input
            className="form-control"
            type="text"
            placeholder="Search Your Task"
            aria-label="default input example"
            value={searchValue}
            onChange={handleInputChange}
          />
          <button
            type="button"
            className="btn-common btn-Default"
            onClick={handleButtonClick}
          >
            Search
          </button>
        </div>
      </div>
      <div className="col-2 d-flex justify-content-end">
        <div className="nav-right">
          <button
            type="button"
            className="btn-common btn-logout btn-Default"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
      <hr />
    </nav>
  )
}

export default Navbar