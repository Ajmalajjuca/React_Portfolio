import React from 'react'
import AdminPanel from './components/Admin/AdminPanel'
import { ToastContainer } from 'react-toastify'
import TwoFactorAuth from './components/Admin/TwoFactorAuth'

const Admin = () => {
  return (
    <div>
      <ToastContainer/>
      <TwoFactorAuth />
    </div>
  )
}

export default Admin
