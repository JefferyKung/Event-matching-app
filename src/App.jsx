import { BrowserRouter, Routes, Route } from 'react-router-dom'

import HomeBox from './container/CredencialsBox'
import Panel from './pages/Panel'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<HomeBox />} />
        <Route path="/mainpanel" element={<Panel />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
