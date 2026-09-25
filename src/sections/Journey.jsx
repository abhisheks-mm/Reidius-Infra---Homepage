import { useEffect, useRef, useState } from 'react'
import { journey } from '../content'
import './journey.css'

/* The phases play one after another on their own while the section is on screen. Scrolling is never held:
   the timer runs whether the visitor stays or scrolls on, and it pauses only while the section is off screen or
   the pointer rests on the list. The timing lives in CSS (--dwell in journey.css): the open card's edge bar
   grows for that long, and when its animation ends the next phase opens. With reduced motion there is no bar,
   so nothing advances by itself; the phases open on click. */
const VISIBLE = 0.35 // how much of the section must be on screen for it to play

export default function Journey() {
  const { titleLines, sub, phases } = journey
  const n = phases.length
  const [open, setOpen] = useState(0)
  const [onScreen, setOnScreen] = useState(false)
  const [hovered, setHovered] = useState(false)
  const root = useRef(null)

  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: VISIBLE })
    io.observe(root.current)
    return () => io.disconnect()
  }, [])

  const next = () => setOpen((k) => (k + 1) % n)
  const fallback = phases[0].visual

  return (
    <section
      ref={root}
      id="journey"
      className="journey"
      aria-labelledby="journey-title"
      data-paused={!onScreen || hovered || undefined}
    >
      <div className="journey-inner">
        <div className="journey-copy">
          <h2 id="journey-title" className="journey-title">
            {titleLines.map((line) => (
              <span key={line}>{line} </span>
            ))}
          </h2>
          <p className="journey-sub">{sub}</p>
        </div>

        <div className="journey-media" aria-hidden>
          {phases.map((p, i) =>
            p.video ? (
              <video key={p.title} className="journey-visual" data-on={i === open || undefined} src={p.video} muted loop playsInline autoPlay />
            ) : (
              <img
                key={p.title}
                className="journey-visual"
                data-on={i === open || undefined}
                src={p.visual || fallback}
                alt=""
                loading="lazy"
                decoding="async"
              />
            ),
          )}
        </div>

        <ol className="journey-list" onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}>
          {phases.map((p, i) => {
            const isOpen = i === open
            return (
              <li key={p.title} className="journey-phase" data-open={isOpen || undefined}>
                <button
                  type="button"
                  className="journey-head"
                  aria-expanded={isOpen}
                  aria-controls={`journey-points-${i}`}
                  onClick={() => setOpen(i)}
                >
                  {p.icon ? <img className="journey-icon" src={p.icon} alt="" /> : <span className="journey-icon" aria-hidden />}
                  <span className="journey-text">
                    <span className="journey-name">{p.title}</span>
                    {/* reveal → clipping wrapper → content, so padding never shows while collapsed */}
                    <span className="journey-reveal">
                      <span>
                        <span className="journey-line block">{p.line}</span>
                      </span>
                    </span>
                  </span>
                  {isOpen && <span key={open} className="journey-dwell" aria-hidden onAnimationEnd={next} />}
                </button>
                <div className="journey-reveal" id={`journey-points-${i}`}>
                  <div>
                    <ul className="journey-points">
                      {p.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
