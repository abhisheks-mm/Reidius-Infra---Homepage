import { trust } from '../content'
import './trust.css'

export default function Trust() {
  return (
    <section className="trust" aria-labelledby="trust-title">
      <div className="trust-frame">
        <div className="trust-card">
          <img className="trust-photo" src={trust.photo} alt="" loading="lazy" decoding="async" />
          <img className="trust-shade" src="/trust/shade.svg" alt="" aria-hidden />
          <div className="trust-fade" aria-hidden />

          <h2 id="trust-title" className="trust-title">
            {trust.lines.map((line) => (
              <span key={line}>{line} </span>
            ))}
          </h2>
          <ul className="trust-stats">
            {trust.stats.map((stat) => (
              <li key={stat.value}>
                <p className="trust-value">{stat.value}</p>
                <p className="trust-label">
                  {stat.labelLines.map((line) => (
                    <span key={line}>{line} </span>
                  ))}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
