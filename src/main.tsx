import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'


import { CatalogRoutes } from './routes/Routes.tsx';
import { CartProvider } from './context/CartContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CartProvider>
      <CatalogRoutes />
    </CartProvider>
  </React.StrictMode>
)
