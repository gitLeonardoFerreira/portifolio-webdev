export default function SectionHeading({ index, label, title, intro }) {
  return (
    <div className="section-heading">
      <span className="section-index">
        {index} / {label}
      </span>
      <h2>{title}</h2>
      {intro && <p>{intro}</p>}
    </div>
  )
}
