import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import Initial from './pages/Initial.tsx'
import Pessoas from './pages/Pessoas.tsx'
import Categorias from './pages/Categorias.tsx'
import Transacoes from './pages/Transacoes.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Initial /> },
      { path: "/pessoas", element: <Pessoas /> },
      { path: "/categorias", element: <Categorias /> },
      { path: "/transacoes", element: <Transacoes /> },
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
