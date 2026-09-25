import { compare } from '../content'
import './compare.css'

const Lines = ({ lines }) => lines.map((line) => <span key={line}>{line} </span>)

/** One side of the comparison: header, headline and a cell per topic. */
function Side({ side, topics, badge }) {
  return (
    <>
      <div className="cmp-head">
        {badge ? <img className="cmp-badge" src={badge} alt="" /> : <span className="cmp-badge" aria-hidden />}
        <p className="cmp-label">
          <Lines lines={side.labelLines} />
        </p>
      </div>
      <h3 className="cmp-col-title">
        <Lines lines={side.titleLines} />
      </h3>
      <ul className="cmp-rows">
        {side.cells.map((cell, i) => (
          <li key={cell}>
            <span className="cmp-topic">
              {topics[i]}
              <span className="cmp-colon">: </span>
            </span>
            {cell}
          </li>
        ))}
      </ul>
    </>
  )
}

export default function Compare() {
  const { titleLines, topics, them, us } = compare

  return (
    <section className="cmp" aria-labelledby="cmp-title">
      <div className="cmp-inner">
        <h2 id="cmp-title" className="cmp-title">
          <Lines lines={titleLines} />
        </h2>

        <div className="cmp-table">
          {/* Topic names down the left; the cells carry them for screen readers, so this copy is visual only. */}
          <ul className="cmp-topics" aria-hidden>
            {topics.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          {[302, 352, 402, 452].map((y) => (
            <span key={y} className="cmp-rule" style={{ top: `calc(${y} * var(--s))` }} aria-hidden />
          ))}

          <div className="cmp-col cmp-them">
            <Side side={them} topics={topics} />
          </div>

          <div className="cmp-us">
            <div className="cmp-card">
              <Side side={us} topics={topics} badge="/icons/ri-badge.svg" />
            </div>
            <ul className="cmp-extras" aria-label="Also included with Reidius Infra">
              {us.extras.map((item) => (
                <li key={item}>
                  <img src="/icons/check-circle.svg" alt="" width="24" height="24" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
