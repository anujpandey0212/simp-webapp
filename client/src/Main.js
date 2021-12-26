import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/cards';
import Editor from './components/ck_editor';
import Simulation from './components/simulation';
import Login from './components/login';
import Ragister from './components/ragister';
import { ProtectedRoute } from './protected route';

const Main = () => {
  return (
    <Routes>
      <Route path='/' element={<Home itemsPerPage={4}/>}></Route>
      <Route path='/signin' element={<Login/>}></Route>
      <Route path='/ragister' element={<Ragister/>}></Route>
      <Route path='/editor' element={<Editor/>}></Route>
      <Route exact path="/simulationplay" element={<ProtectedRoute/>} />
      <Route path='/simulation' element={<Simulation/>}></Route>
    </Routes>
  );
}

export default Main;