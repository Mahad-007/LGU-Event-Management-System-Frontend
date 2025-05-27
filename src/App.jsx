import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import { Router, Route } from 'react-router-dom'
import Signup from './Pages/Signup'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast'
import Login from './Pages/Login'

function App() {


  return (
    <div>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>

      </Router>
    </div>
  )
}

export default App
