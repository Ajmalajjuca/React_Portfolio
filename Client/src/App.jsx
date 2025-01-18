import React from 'react'
import User from './User'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Admin from './Admin'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<User/>}/>
      <Route path='/admin' element={<Admin/>}/>
    </Routes>
    </BrowserRouter>
    
  )
}

export default App
