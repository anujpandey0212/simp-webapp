import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './components/cards';
import Editor from './components/ck_editor';

const Main = () => {
  return (
    <Routes> {/* The Routes decides which component to show based on the current URL.*/}
      <Route path='/' element={<Home/>}></Route>
      <Route path='/editor' element={<Editor/>}></Route>
    </Routes>
  );
}

export default Main;