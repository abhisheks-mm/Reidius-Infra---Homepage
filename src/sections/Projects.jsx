import { useState } from 'react'
import { projects } from '../content'
import './projects.css'

const src = (p, size) => `/projects/${p.img}${size ? `-${size}` : ''}.webp`

export default function Projects() {
  const { title, tabs, cta, portfolio, viewAll } = projects
  const [tab, setTab] = useState('active') // Figma shows "Under construction" selected
  const [k, setK] = useState(0) // the featured project
  const [all, setAll] = useState(false)
  const list = projects[tab]
  const now = list[k]

  const pick = (t) => {
    setTab(t)
    setK(0)
  }
  const go = (i) => setK(Math.max(0, Math.min(list.length - 1, i)))

  return (
    <section id="projects" className="work" aria-labelledby="work-title">
      <div className="work-top">
        <h2 id="work-title" className="work-title">
          {title}
        </h2>

        <div className="work-tabs" role="tablist" aria-label="Projects">
          {Object.entries(tabs).map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="tab"
              className="work-tab"
              aria-selected={tab === id}
              aria-controls="work-panel"
              onClick={() => pick(id)}
            >
              {label}
            </button>
          ))}
        </div>

        <a className="work-download" href={portfolio} target="_blank" rel="noreferrer">
          {cta}
        </a>

        <div id="work-panel" className="work-feature" role="tabpanel" aria-label={`${now.client}’s home`}>
          {list.map((p, i) => (
            <img
              key={p.img}
              src={src(p)}
              srcSet={`${src(p, 720)} 720w, ${src(p)} 1600w`}
              sizes="(aspect-ratio <= 1) 92vw, 67vw"
              alt={i === k ? `${p.client}’s home, ${p.place}` : ''}
              data-on={i === k || undefined}
              loading={i === k ? 'eager' : 'lazy'}
              decoding="async"
            />
          ))}
        </div>

        <div className="work-info" key={`${tab}-${k}`} aria-live="polite">
          <p className="work-name">{now.client}</p>
          <p className="work-type">{now.type}</p>
          <p className="work-place">{now.place}</p>
        </div>

        <div className="work-controls">
          <div className="work-arrows">
            <button type="button" className="work-arrow" aria-label="Previous project" disabled={k === 0} onClick={() => go(k - 1)}>
              <img src="/icons/arrow-back-dark.svg" alt="" width="24" height="24" />
            </button>
            <button
              type="button"
              className="work-arrow"
              data-dir="next"
              aria-label="Next project"
              disabled={k === list.length - 1}
              onClick={() => go(k + 1)}
            >
              <img src="/icons/arrow-back-dark.svg" alt="" width="24" height="24" />
            </button>
          </div>
          <button type="button" className="work-all-btn" aria-expanded={all} aria-controls="work-all" onClick={() => setAll((v) => !v)}>
            {all ? 'Show less' : viewAll}
            <img src="/icons/arrow-back-dark.svg" alt="" width="24" height="24" />
          </button>
        </div>
      </div>

      {all ? (
        <ul id="work-all" className="work-all">
          {list.map((p) => (
            <li key={p.img}>
              <img src={src(p, 720)} alt={`${p.client}’s home, ${p.place}`} loading="lazy" decoding="async" />
              <p className="work-name">{p.client}</p>
              <p className="work-type">
                {p.type}, {p.place}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="work-rail" aria-label="Next projects">
          {list.map((p, i) => (
            <button
              key={`${tab}-${p.img}`}
              type="button"
              className="work-thumb"
              style={{ '--slot': i - k - 1 }}
              tabIndex={i > k ? 0 : -1}
              aria-hidden={i <= k || undefined}
              aria-label={`Show ${p.client}’s home`}
              onClick={() => go(i)}
            >
              <img src={src(p, 720)} alt="" loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
      )}
      <div className="work-end" />
    </section>
  )
}
