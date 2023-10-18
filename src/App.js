/* eslint-disable react/prop-types */
import React, { Component, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './scss/style.scss'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)
// Components for Public Routes
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

// Components for Private Routes
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={loading}>
        <Routes>
          {/* Public Routes */}
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/404" element={<Page404 />} />
          <Route exact path="/500" element={<Page500 />} />

          {/* Private Routes */}
          <Route path="*" element={<PrivateRoute path="*" element={<DefaultLayout />} />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

// A custom PrivateRoute component to enforce access control
const PrivateRoute = ({ element }) => {
  // Implement your access control logic here (e.g., check if the user is authenticated)
  const isAuthenticated = localStorage.getItem('token')
  return isAuthenticated ? element : <Navigate to="/login" />
}

export default App
