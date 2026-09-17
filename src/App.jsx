import './App.css'
import { Home } from './pages/Home.jsx'
import { Notes } from './pages/Notes.jsx'
import { Settings } from './pages/Settings.jsx'
import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div >
  )
}

export default App
