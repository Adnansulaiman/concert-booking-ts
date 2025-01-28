
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import Navbar from './components/Navbar/Navbar'
// import { Button } from './components/ui/button'

function App() {

  return (
    <>
    <div className="font-oswald">
    <Navbar />

    <Routes >
      <Route path='/' element={<Home />} />
     </Routes>

     </div>
    </>
  )
}

export default App
