
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'


function App() {

  return (
    <>
    <div className="font-oswald">
    <Navbar />

    <Routes >
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
     </Routes>
    <Footer />
     </div>
    </>
  )
}

export default App
