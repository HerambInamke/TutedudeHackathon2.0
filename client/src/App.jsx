import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import PageRoutes from './routes/PageRoutes';

// App.jsx is the root component. It wraps the app in BrowserRouter and renders all routes from PageRoutes.
function App() {
  return (
    <BrowserRouter>
      <PageRoutes />
    </BrowserRouter>
  );
}

export default App;
