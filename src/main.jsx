import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import './hover-fix.css'
import './certificate-preview.css'
createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)
