import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Landing from './pages/landing';
import Login from './pages/login';
import Scan from './pages/scan';
import { db } from '../firebase.ts'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/scanner" element={<Scan/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App