import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

// estilos do Swiper (importe só os que usa)
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename="/inicio">
    <App />
  </BrowserRouter>
)
