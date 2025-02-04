
import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import AdminLayout from './pages/Admin/AdminLayout'
import AddEvent from './pages/Admin/AddEvent'


function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin'); 
  return (
    <>
    <div className="font-oswald">
    {!isAdminRoute && <Navbar />} {/* Show Navbar only if not on Admin route */}

    <Routes >
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      {/* Admin Routes */}
      <Route path='/admin' element={<AdminLayout />} >
        <Route path='/admin/add-events' element={<AddEvent />} />
      </Route>
     </Routes>
     {!isAdminRoute && <Footer />} {/* Show Footer only if not on Admin route */}
    
     </div>
     
    </>
  )
}

export default App
