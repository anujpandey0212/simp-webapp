import React from 'react';
import { Routes, Route, useNavigate,useLocation } from 'react-router-dom';
import Home from './components/cards';
import Editor from './components/ck_editor';
import Simulation from './components/simulation';
import Login from './components/login';
import Ragister from './components/ragister';
import { ProtectedRoute } from './protected route';
import Notfound from './components/not_fouund';
import Result from './components/result';

const Main = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  console.log("this", isAuthenticated);
  return (
    <Routes>
      <Route path='/' element={<Home itemsPerPage={8}/>}></Route>
      <Route path='/signin' element={<Login/>}></Route>
      <Route path='/ragister' element={<Ragister/>}></Route>
      <Route path='/editor' element={<Editor/>}></Route>
      <Route path="/notfound" element={<Notfound/>}></Route>
      <Route
          path="/authenticate"
          element={
            <ProtectedRoute>
            </ProtectedRoute>
          }
        />
      <Route path='/simulation' element={<Simulation/>}></Route>
      <Route path='/result' element={<Result itemsPerPage={8}/>}></Route>
    </Routes>
  );
}

export default Main;