import React from 'react'
import AdminPanel from './components/Admin/AdminPanel'
import { ToastContainer } from 'react-toastify'

const Admin = () => {
  return (
    <div>
      <ToastContainer/>
      <AdminPanel/>
    </div>
  )
}

export default Admin
