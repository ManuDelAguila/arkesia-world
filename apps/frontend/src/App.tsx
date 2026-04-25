import { lazy, Suspense } from "react"
import { Routes, Route } from "react-router"
import { Header } from './components/Header'

const Home = lazy(() => import('./pages/HomePage.tsx'))
const Character = lazy(() => import('./pages/CharacterPage.tsx'))

function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<div>Cargando...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/character/:characterName" element={<Character />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
