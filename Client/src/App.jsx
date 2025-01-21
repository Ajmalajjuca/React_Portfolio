import React, { useState } from 'react'
import User from './User'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Admin from './Admin'
import store from './Redux/Store/ReduxStore'
import { Provider } from 'react-redux'
import AdminPanel from './components/Admin/AdminPanel'
import PrivateRoute from './components/Admin/PrivetRoute/PrivateRoute'

const App = () => {
  return (
    <Provider store={store}> 
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<User/>}/>
      <Route path='/admin' element={<Admin />}/>
      <Route path='/admin/dashboard' element={<PrivateRoute ><AdminPanel/></PrivateRoute>}/>
      
    </Routes>
    </BrowserRouter>
    </Provider>
  )
}

export default App
