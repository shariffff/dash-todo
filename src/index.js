
import React from 'react'
import {createRoot} from 'react-dom/client'

import App from './App'

createRoot(document.getElementById(`TodoApp`)).render(<App />)

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept(console.error)
}