import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/cards';
import Editor from './components/ck_editor';
import Simulation from './components/simulation';

const Main = () => {
  return (
    <Routes> {/* The Routes decides which component to show based on the current URL.*/}
      <Route path='/' element={<Home itemsPerPage={4}/>}></Route>
      <Route path='/editor' element={<Editor/>}></Route>
      <Route path='/simulation' element={<Simulation/>}></Route>
    </Routes>
  );
}

export default Main;