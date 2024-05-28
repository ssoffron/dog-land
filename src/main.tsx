import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App.tsx';
import Map from './pages/Map.tsx';
import Development from './pages/Development.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename='/dog-land'>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/map' element={<Map />} />
        <Route path='*' element={<Development />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
