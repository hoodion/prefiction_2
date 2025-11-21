import React from 'react'
import { createRoot } from 'react-dom/client'
import PrefictionPreview from './PrefictionPreview'
import './index.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PrefictionPreview />
  </React.StrictMode>
)
