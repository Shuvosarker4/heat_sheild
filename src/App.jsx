
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router'

import MainLayout from './layouts/MainLayouts'
import Home from './pages/Home'
import About from './pages/About'
import NotFound from './pages/NotFound'
import Client from './components/Client'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/client" element={<Client/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
