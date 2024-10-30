import { useState } from 'react'
import {Route,Routes,BrowserRouter as Router} from 'react-router-dom'
import { Auth } from "./pages/login/index.jsx"
import {ExpenseTracker} from "./pages/expense-tracker/index.jsx"
import './App.css'

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Auth />}/>
        <Route path="/expense-tracker" element={<ExpenseTracker/>}/>
      </Routes>
    </Router>
  )
}

export default App
