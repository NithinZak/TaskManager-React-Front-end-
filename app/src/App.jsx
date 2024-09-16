import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import Home from './Pages/Home';
import UserRegistration from './Components/User/Registration/UserRegistration';
import UserLogin from './Components/User/UserLogin/UserLogin';


function App() {
  const token = localStorage.getItem("authToken");
  console.log("token --> ",token);
  let isAuthToken = false;
  if (token != null){
    isAuthToken = true;
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserLogin />} />  
        <Route path="/register" element={<UserRegistration />} />
        <Route path='/home' element={isAuthToken?<Home/>:<UserLogin/>} />
      </Routes>
    </Router>
  )
}

export default App
