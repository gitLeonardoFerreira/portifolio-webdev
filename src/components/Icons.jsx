export function ArrowIcon({ diagonal = false }) {
  return diagonal ? (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 19 19 5M8 5h11v11"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 12h16m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function CloudMark({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 74 42" fill="none" aria-hidden="true">
      <path
        d="M3 31c4-9 12-14 21-12C28 9 37 4 46 9c5 3 8 7 9 12 8-1 14 3 16 10"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path d="M11 36h51" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

export function CartoonCloud({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 620 410" fill="none" aria-hidden="true">
      <path
        d="M110 375c-48 0-85-35-85-79 0-42 33-75 75-79 8-75 63-128 133-128 45 0 87 20 114 55 21-16 45-24 73-24 69 0 124 54 124 121 31 12 51 41 51 72 0 35-29 62-65 62H110Z"
        fill="white"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
