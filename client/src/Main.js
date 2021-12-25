import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/cards';
import Editor from './components/ck_editor';
import Simulation from './components/simulation';
import auth from "./auth";
// import { ProtectedRoute } from "./protected route";

const Main = () => {
  return (
    <Routes> {/* The Routes decides which component to show based on the current URL.*/}
      <Route path='/' element={<Home itemsPerPage={4}/>}></Route>
      {/* if (auth.isAuthenticated()) {
        <Route path='/editor' element={<Editor />}></Route>
        }

      else{
        <Navigate to='/' />
        
      } */}
      {/* <Route path='/editor' component={<Editor/>}></Route> */}
      { auth.isAuthenticated() && 
          <Route path='/editor' element={<Editor />}></Route>
        }
      {/* <Route path='/editor' element={<Editor/>}></Route> */}
      {/* <ProtectedRoute exact path="/editor" element={<Editor/>} /> */}
      <Route path='/simulation' element={<Simulation/>}></Route>
    </Routes>
  );
}

export default Main;