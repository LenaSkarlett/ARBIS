import './default.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminPanel from './pages/admin-panel';
import Auth from './pages/auth';
import Landing from './pages/landing';
import NotFound from './pages/not-found';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AdminPanel />} />
        <Route path='/page-not-found-404' element={<NotFound />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/:name' element={<Landing />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
