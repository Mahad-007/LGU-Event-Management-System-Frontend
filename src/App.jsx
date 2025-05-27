import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import { Router, Route } from 'react-router-dom'
import Signup from './Pages/Signup'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {


  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
        </Routes>

      </Router>
    </div>
  )
}

export default App
