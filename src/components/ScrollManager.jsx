import { useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'
export default function ScrollManager() {
  const location = useLocation()
  const navigationType = useNavigationType()
  useEffect(() => {
    if (location.hash) {
      const frame = requestAnimationFrame(() => {
        document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView()
      })
      return () => cancelAnimationFrame(frame)
    }
    if (navigationType === 'POP' && Number.isInteger(location.state?.flightReturn)) {
      const frame = requestAnimationFrame(() => {
        const markers = document.querySelectorAll('.flight-marker')
        markers[location.state.flightReturn]?.scrollIntoView({
          behavior: 'instant',
          block: 'start',
        })
      })
      return () => cancelAnimationFrame(frame)
    }
    if (navigationType === 'REPLACE' && Number.isInteger(location.state?.flightReturn)) return
    if (navigationType !== 'POP') window.scrollTo(0, 0)
  }, [location.pathname, location.hash, location.state, navigationType])
  return null
}
