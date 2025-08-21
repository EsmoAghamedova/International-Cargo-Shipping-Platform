import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/auth/Login'
import RegisterUserPage from './pages/auth/RegisterCompany';
import './App.css'
import RegisterCompanyPage from './pages/auth/RegisterCompany';

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register/user' element={<RegisterUserPage />} />
        <Route path='/register/company' element={<RegisterCompanyPage /> } />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
