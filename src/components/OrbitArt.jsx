import { useRef, useState, useEffect } from 'react'
import { portraits } from '../data/portraits.js'
import { ArrowIcon, CartoonCloud } from './Icons.jsx'
export default function OrbitArt({ active = true }) {
  const artRef = useRef(null)
  const [perspective, setPerspective] = useState(0)
  const [turning, setTurning] = useState(false)
  const [visible, setVisible] = useState(false)
  const current = portraits[perspective]
  const next = portraits[(perspective + 1) % portraits.length]

  useEffect(() => {
    const node = artRef.current
    if (!node || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.25,
    })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible || !active || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = window.setInterval(() => {
      if (document.visibilityState === 'visible') setTurning(true)
    }, 7000)
    return () => window.clearInterval(timer)
  }, [visible, active])

  function turnPortrait() {
    if (turning) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPerspective((index) => (index + 1) % portraits.length)
      return
    }
    setTurning(true)
  }

  function finishTurn(event) {
    if (event.propertyName !== 'transform' || event.target !== event.currentTarget) return
    setPerspective((index) => (index + 1) % portraits.length)
    setTurning(false)
  }

  return (
    <div
      ref={artRef}
      className="orbit-art has-portrait"
      data-perspective={perspective}
      aria-label="Retratos interativos de Leonardo"
    >
      <span className="sky-sun" aria-hidden="true" />
      <CartoonCloud className="sky-cloud" />
      <div className="portrait-stage">
        <div
          className={`portrait-turn ${turning ? 'is-turning' : ''}`}
          onTransitionEnd={finishTurn}
        >
          <img
            className="orbit-portrait portrait-front"
            src={current.src}
            alt={current.alt}
            width="640"
            height="800"
            loading="lazy"
            decoding="async"
          />
          <img
            className="orbit-portrait portrait-back"
            src={next.src}
            alt=""
            width="640"
            height="800"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
      <div className="orbit-controls">
        <div className="orbit-caption">
          <span>{String(perspective + 1).padStart(2, '0')} / 03 POSES</span>
          <strong>{current.label}</strong>
        </div>
        <button
          type="button"
          className="orbit-next"
          aria-label={`Mudar pose, atual: ${current.label}`}
          disabled={turning}
          onClick={turnPortrait}
        >
          <ArrowIcon />
        </button>
      </div>
    </div>
  )
}
