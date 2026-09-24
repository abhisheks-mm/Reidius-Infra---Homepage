import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { testimonials } from '../content'
import StoryPlayer from '../components/StoryPlayer'
import './testimonials.css'

gsap.registerPlugin(ScrollTrigger)

const ENTER = { railFrom: 40 } // while the section slides up, the cards slide in from this % of the screen width
const SWIPE = 40 // px of horizontal travel that counts as a swipe

export default function Testimonials() {
  const { title, sub, items } = testimonials
  const n = items.length
  const [k, setK] = useState(0) // the current card; the track keeps it at the left margin
  const [playing, setPlaying] = useState(null)
  const root = useRef(null)
  const drag = useRef(null)

  const clamp = (i) => Math.max(0, Math.min(n - 1, i))
  const go = (i) => setK(clamp(i))
  const step = (d) => setK((c) => clamp(c + d)) // functional, so quick repeated clicks all count

  // Slide-in, scrubbed by the same scroll that brings the section up over the hero.
  useLayoutEffect(() => {
    const section = root.current
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        section.querySelector('.stories-rail'),
        { xPercent: ENTER.railFrom },
        {
          xPercent: 0,
          ease: 'power2.out',
          scrollTrigger: { trigger: section, start: 'top bottom', end: 'top top', scrub: true },
        },
      )
    })
    return () => mm.revert()
  }, [])

  const onPointerDown = (e) => {
    drag.current = { x: e.clientX, y: e.clientY, swiped: false }
  }
  const onPointerUp = (e) => {
    const d = drag.current
    if (!d) return
    const dx = e.clientX - d.x
    if (Math.abs(dx) > SWIPE && Math.abs(dx) > Math.abs(e.clientY - d.y)) {
      d.swiped = true
      step(dx < 0 ? 1 : -1)
    }
  }
  // A click anywhere on a card plays it, unless the pointer was swiping the track.
  const onCardClick = (item) => {
    if (drag.current?.swiped) return
    setPlaying(item)
  }
  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') step(1)
    else if (e.key === 'ArrowLeft') step(-1)
    else return
    e.preventDefault()
  }

  return (
    <section
      ref={root}
      id="stories"
      className="stories"
      aria-labelledby="stories-title"
      style={{ '--k': k, '--n': n }}
    >
      <div className="stories-head">
        <h2 id="stories-title" className="stories-title">
          {title}
        </h2>
        <p className="stories-sub">{sub}</p>
      </div>

      <div className="stories-nav">
        <button
          type="button"
          className="stories-arrow"
          data-dir="prev"
          aria-label="Previous story"
          aria-controls="stories-track"
          disabled={k === 0}
          onClick={() => step(-1)}
        >
          <img src="/icons/arrow-back.svg" alt="" width="24" height="24" />
        </button>
        <button
          type="button"
          className="stories-arrow"
          data-dir="next"
          aria-label="Next story"
          aria-controls="stories-track"
          disabled={k === n - 1}
          onClick={() => step(1)}
        >
          <img src="/icons/arrow-back.svg" alt="" width="24" height="24" />
        </button>
      </div>

      <div
        className="stories-rail"
        role="region"
        aria-roledescription="carousel"
        aria-label="Homeowner stories"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onKeyDown={onKeyDown}
      >
        <ul id="stories-track" className="stories-track">
          {items.map((item, i) => (
            <li
              key={item.name}
              className="story"
              data-current={i === k || undefined}
              aria-label={`${i + 1} of ${n}`}
              onClick={() => onCardClick(item)}
            >
              <img src={item.img} alt="" loading="lazy" decoding="async" draggable={false} />
              <button
                type="button"
                className="story-watch"
                aria-label={`Watch ${item.name}’s story`}
                // Tabbing to a card brings it to the current position
                onFocus={(e) => e.currentTarget.matches(':focus-visible') && go(i)}
              >
                Watch
              </button>
            </li>
          ))}
        </ul>
      </div>

      <StoryPlayer story={playing} onClose={() => setPlaying(null)} />
    </section>
  )
}
