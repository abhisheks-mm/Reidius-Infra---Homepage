import { app } from '../content'
import './bento.css'

const Lines = ({ lines }) => lines.map((line) => <span key={line}>{line} </span>)

export default function Bento() {
  const { titleLines, subLines, cards } = app

  return (
    <section className="bento" aria-labelledby="bento-title">
      <div className="bento-inner">
        <h2 id="bento-title" className="bento-title">
          <Lines lines={titleLines} />
        </h2>
        <p className="bento-sub">
          <Lines lines={subLines} />
        </p>

        <div className="bento-grid">
          <article className="bento-card bento-daily">
            <div className="bento-text">
              <h3 className="bento-card-title">
                <Lines lines={cards.daily.titleLines} />
              </h3>
            </div>
            <div className="bento-art" aria-hidden>
              <img src="/app/daily-update.webp" alt="" loading="lazy" decoding="async" />
            </div>
          </article>

          <article className="bento-card bento-manager">
            <img className="bento-bg" src="/app/pm-site.webp" alt="" loading="lazy" decoding="async" />
            <div className="bento-wash" aria-hidden />
            <div className="bento-art" aria-hidden>
              <img src="/app/pm-person.webp" alt="" loading="lazy" decoding="async" />
            </div>
            <img className="bento-fade" src="/app/pm-fade.svg" alt="" aria-hidden />
            <div className="bento-text">
              <h3 className="bento-card-title">
                <Lines lines={cards.manager.titleLines} />
              </h3>
              <p className="bento-card-body">{cards.manager.body}</p>
            </div>
          </article>

          <article className="bento-card bento-camera">
            <div className="bento-text">
              <h3 className="bento-card-title">
                <Lines lines={cards.camera.titleLines} />
              </h3>
              <p className="bento-card-body">{cards.camera.body}</p>
            </div>
            <div className="bento-art" aria-hidden>
              <img src="/app/monitor.webp" alt="" loading="lazy" decoding="async" />
            </div>
          </article>

          <article className="bento-card bento-expenses">
            <div className="bento-text">
              <h3 className="bento-card-title">
                <Lines lines={cards.expenses.titleLines} />
              </h3>
            </div>
            <div className="bento-art" aria-hidden>
              <img src="/app/expenses.webp" alt="" loading="lazy" decoding="async" />
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
