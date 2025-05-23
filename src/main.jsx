import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppraisalProvider } from './contexts/AppraisalContext.jsx' // Changed to .jsx

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AppraisalProvider>
        <App />
      </AppraisalProvider>
    </BrowserRouter>
  </StrictMode>,
)
