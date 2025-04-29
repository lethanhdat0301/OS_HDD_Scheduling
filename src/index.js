import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FCFS from './algorithms/fcfs';
import SSTF from './algorithms/sstf';
import SCAN from './algorithms/scan';
import LOOK  from './algorithms/look';
import CSCAN from './algorithms/cscan';
import CLOOK from './algorithms/clook';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="fcfs" element={<FCFS />} />
      <Route path="sstf" element={<SSTF />} />
      <Route path="scan" element={<SCAN />} />
      <Route path="look" element={<LOOK />} />
      <Route path="c_scan" element={<CSCAN />} />
      <Route path="c_look" element={<CLOOK />} />
    </Routes>
  </BrowserRouter>
);
