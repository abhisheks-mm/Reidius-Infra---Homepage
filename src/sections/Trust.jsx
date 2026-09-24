import { trust } from '../content'
import './trust.css'

export default function Trust() {
  return (
    <section className="trust" aria-labelledby="trust-title">
      <div className="trust-inner">
        <h2 id="trust-title" className="trust-title">
          {trust.lines.map((line) => (
            <span key={line}>{line} </span>
          ))}
        </h2>
        <ul className="trust-stats">
          {trust.stats.map((stat) => (
            <li key={stat.label}>
              <p className="trust-value">{stat.value}</p>
              <p className="trust-label">{stat.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
