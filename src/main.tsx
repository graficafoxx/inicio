import './index.css'   // <- ESSENCIAL pro Vite gerar e injetar o CSS no build
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename="/inicio">
    <App />
  </BrowserRouter>
)
