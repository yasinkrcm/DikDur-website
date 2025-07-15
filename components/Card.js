export default function Card({ children, className = "", hover = true }) {
  return <div className={`card ${hover ? "hover:shadow-lg" : ""} ${className}`}>{children}</div>
}
