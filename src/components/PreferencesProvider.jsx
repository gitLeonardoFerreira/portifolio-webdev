import { useEffect, useState } from 'react'
import { PreferencesContext } from '../context/PreferencesContext.js'
const read = (key, fallback) => {
  try {
    return localStorage.getItem(key) || fallback
  } catch {
    return fallback
  }
}
export default function PreferencesProvider({ children }) {
  const [theme, setTheme] = useState(() => read('portfolio-theme', 'light'))
  const [reading, setReading] = useState(() => read('portfolio-reading', 'false') === 'true')
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('portfolio-theme', theme)
    } catch {
      /* preferences still work without storage */
    }
  }, [theme])
  useEffect(() => {
    try {
      localStorage.setItem('portfolio-reading', String(reading))
    } catch {
      /* non-persistent mode */
    }
  }, [reading])
  return (
    <PreferencesContext.Provider
      value={{
        theme,
        toggleTheme: () => setTheme((value) => (value === 'dark' ? 'light' : 'dark')),
        reading,
        toggleReading: () => setReading((value) => !value),
      }}
    >
      {children}
    </PreferencesContext.Provider>
  )
}
