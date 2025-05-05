import React, { useState } from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../Login/Login";
import CreateAccount from '../CreateAccount/CreateAccount';
import Navbar from '../Navbar/Navbar';
import PostListing from '../PostListing/PostListing';
import HomePage from '../HomePage/HomePage';

function App() {
  const [view] = useState('main'); // Track the current view

   const renderView=()=>{
    switch (view) {
      case 'login':
        return <Login />;
        default:
          return (
            <>
              <Router>
              <Navbar /> {}
                <Routes>
                <Route path="/login" element={<Login />} />
                </Routes>

                <Routes>
                <Route path="/createAccount" element={<CreateAccount />} />
                </Routes>

                <Routes>
                <Route path="/postListing" element={<PostListing />} />
                </Routes>

                <Routes>
                <Route path="/homePage" element={<HomePage />} />
                </Routes>

              </Router>
            </>
          );
    }
  };
  
  return <div className='idk vere'>{renderView()}</div>;
}

export default App
