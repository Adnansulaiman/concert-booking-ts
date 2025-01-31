
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import About from './pages/About/About'
// import { Contact } from 'lucide-react'
// import { Button } from './components/ui/button'

function App() {

  return (
    <>
    <div className="font-oswald">
    <Navbar />

    <Routes >
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
     </Routes>
    <Footer />
     </div>
    </>
  )
}

export default App
