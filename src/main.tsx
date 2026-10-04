import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)

// Optional free, privacy-friendly visit counter (GoatCounter). Set VITE_GOATCOUNTER to your site code.
const gc = import.meta.env.VITE_GOATCOUNTER as string | undefined
if (gc) { const s = document.createElement('script'); s.async = true; s.src = '//gc.zgo.at/count.js'; s.dataset.goatcounter = `https://${gc}.goatcounter.com/count`; document.body.appendChild(s) }
