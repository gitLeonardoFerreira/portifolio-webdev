import { useRef, useEffect } from 'react'
export default function Reveal({ children, className = '', as = 'div' }) {
  const Element = as
  const ref = useRef(null)
  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') {
      node?.classList.add('is-visible')
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('is-visible')
          observer.unobserve(node)
        }
      },
      { threshold: 0.12 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])
  return (
    <Element ref={ref} className={`reveal ${className}`}>
      {children}
    </Element>
  )
}
