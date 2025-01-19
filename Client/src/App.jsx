import React from 'react'
import User from './User'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Admin from './Admin'
import store from './Redux/Store/ReduxStore'
import { Provider } from 'react-redux'

const App = () => {
  return (
    <Provider store={store}> 
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<User/>}/>
      <Route path='/admin' element={<Admin/>}/>
    </Routes>
    </BrowserRouter>
    </Provider>
  )
}

export default App
