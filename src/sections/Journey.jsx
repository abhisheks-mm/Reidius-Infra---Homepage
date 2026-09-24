import { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { journey } from '../content'
import './journey.css'

gsap.registerPlugin(ScrollTrigger)

/* When the section's top reaches the top of the screen on the way down, the page holds there and the bar runs
   down the stages by itself at a steady pace; after the last stage the page scrolls on as normal. It holds once
   per visit. While it holds, scrolling down (or a swipe, or the arrow keys) skips to the next stage and scrolling
   up goes back one; at the first stage, scrolling up lets the visitor leave. Clicking a stage jumps to it.
   Progress p runs 0 → 1; stage k is open while p is in [k/n, (k+1)/n). */
const PLAY = {
  stage: 2, // seconds per stage
  startDelay: 0.5, // pause after the page holds, before the bar starts
  releaseDelay: 0.8, // pause on the last stage before the page scrolls again
  skip: 0.45, // seconds to glide to a stage that was skipped to or clicked
  gesture: 40, // px of wheel or swipe travel that counts as one step
  gestureGap: 550, // ms between two gesture steps (a trackpad fires many wheel events per flick)
}

export default function Journey() {
  const { titleLines, sub, video, steps } = journey
  const n = steps.length
  const [open, setOpen] = useState(0)
  const root = useRef(null)
  const jump = useRef(null)

  useLayoutEffect(() => {
    const section = root.current
    const html = document.documentElement
    const box = section.querySelector('.journey-listbox')
    const list = section.querySelector('.journey-list')
    const ol = section.querySelector('.journey-steps')
    const items = [...ol.children]
    const track = section.querySelector('.journey-track')
    const clip = section.querySelector('video')

    const state = { p: 0 }
    const stageOf = (p) => Math.min(n - 1, Math.floor(p * n))
    const sync = () => setOpen(stageOf(state.p))
    let tween = null
    let held = false
    let done = false

    const run = (to, duration, ease, onComplete) => {
      tween?.kill()
      tween = gsap.to(state, { p: to, duration, ease, onUpdate: sync, onComplete })
    }
    // Steady play from wherever the bar is to the end.
    const play = (delay = 0) => {
      tween?.kill()
      tween = gsap.to(state, {
        p: 1,
        duration: (1 - state.p) * n * PLAY.stage,
        delay,
        ease: 'none',
        onUpdate: sync,
        onComplete: finish,
      })
    }
    // Glide to the start of stage k, then carry on playing if the page is holding.
    const go = (k) => {
      k = Math.max(0, Math.min(n - 1, k))
      run(k / n + 0.0001, PLAY.skip, 'power2.out', () => held && play())
    }
    const next = () => {
      const k = stageOf(state.p)
      if (k < n - 1) go(k + 1)
      else run(1, PLAY.skip, 'power2.out', finish)
    }
    const back = () => {
      const k = stageOf(state.p)
      if (k > 0) go(k - 1)
      else {
        tween?.kill() // leaving upwards: pause here, and pick up again on the way back down
        release()
      }
    }

    // ---- Holding the page -------------------------------------------------
    let acc = 0
    let last = 0
    let touchY = 0
    const step = (delta) => {
      acc += delta
      const now = performance.now()
      if (now - last < PLAY.gestureGap) return
      if (acc > PLAY.gesture) next()
      else if (acc < -PLAY.gesture) back()
      else return
      acc = 0
      last = now
    }
    const onWheel = (e) => {
      e.preventDefault()
      step(e.deltaY)
    }
    const onTouchStart = (e) => {
      touchY = e.touches[0].clientY
      acc = 0
    }
    const onTouchMove = (e) => {
      e.preventDefault()
      const y = e.touches[0].clientY
      step(touchY - y)
      touchY = y
    }
    const onKey = (e) => {
      const onButton = e.target instanceof HTMLElement && e.target.closest('button, a, input, textarea, select')
      if (['ArrowDown', 'PageDown'].includes(e.key) || (e.key === ' ' && !onButton)) {
        e.preventDefault()
        next()
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault()
        back()
      }
    }
    const listen = (on) => {
      const m = on ? 'addEventListener' : 'removeEventListener'
      window[m]('wheel', onWheel, { passive: false })
      window[m]('touchstart', onTouchStart, { passive: true })
      window[m]('touchmove', onTouchMove, { passive: false })
      window[m]('keydown', onKey)
    }
    const hold = () => {
      if (held || done) return
      held = true
      window.scrollTo({ top: section.getBoundingClientRect().top + window.scrollY, behavior: 'instant' })
      html.classList.add('journey-hold')
      listen(true)
      play(state.p === 0 ? PLAY.startDelay : 0)
    }
    function release() {
      if (!held) return
      held = false
      html.classList.remove('journey-hold')
      listen(false)
    }
    function finish() {
      done = true
      gsap.delayedCall(PLAY.releaseDelay, release)
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      onEnter: (self) => {
        if (reduce) return
        // A jump that lands well past the section (an anchor link to a later section, say) isn't someone
        // scrolling into it: don't pull them back. Normal scrolling crosses the top a few px at a time.
        if (window.scrollY - self.start > window.innerHeight * 0.5) return
        hold()
      },
    })
    // Arriving on a page that is already scrolled past the section: show it finished and don't hold.
    if (st.progress > 0) {
      done = true
      state.p = 1
      sync()
    }
    jump.current = go

    // Bar, list position and video follow p, read from the live layout every frame while the section is on
    // screen, so they stay in step with the stages as they open and close.
    const tick = () => {
      const r = section.getBoundingClientRect()
      if (r.bottom < 0 || r.top > window.innerHeight) return

      const k = stageOf(state.p)
      const frac = Math.min(1, state.p * n - k)
      const h = ol.offsetHeight
      // A stage's zone runs from its own top edge (below the divider) to the next stage's.
      const edge = (el) => el.offsetTop + (parseFloat(getComputedStyle(el).paddingTop) || 0)
      const top = edge(items[k])
      const end = k < n - 1 ? edge(items[k + 1]) : h
      const y = Math.max(items[0].offsetHeight / 2, top + frac * (end - top))
      track.style.setProperty('--fill', (y / h).toFixed(4))

      // Portrait screens that can't show all ten stages: glide the list to keep the open one centred.
      const room = box.clientHeight - (parseFloat(getComputedStyle(box).paddingTop) || 0)
      const centre = items[k].offsetTop + items[k].offsetHeight / 2
      const shift = Math.max(0, Math.min(h - room, centre - room / 2))
      list.style.setProperty('--shift', h > room ? shift.toFixed(1) : '0')

      if (clip && clip.duration && clip.readyState >= 1 && !clip.seeking) {
        const target = state.p * Math.max(0, clip.duration - 0.05)
        if (Math.abs(clip.currentTime - target) > 0.015) clip.currentTime = target
      }
    }
    gsap.ticker.add(tick)

    return () => {
      gsap.ticker.remove(tick)
      tween?.kill()
      gsap.killTweensOf(release)
      release()
      st.kill()
      jump.current = null
    }
  }, [n])

  const now = steps[open]

  return (
    <section ref={root} id="journey" className="journey" aria-labelledby="journey-title">
      <div className="journey-scene">
        <div className="journey-head">
          <h2 id="journey-title" className="journey-title">
            {titleLines.map((line) => (
              <span key={line}>{line} </span>
            ))}
          </h2>
          <p className="journey-sub">{sub}</p>
        </div>

        <div className="journey-media">
          {video ? (
            <video src={video} muted playsInline preload="auto" tabIndex={-1} aria-hidden />
          ) : (
            <div className="journey-now" key={open} aria-hidden>
              <p className="journey-now-count">
                Stage {open + 1} of {steps.length}
              </p>
              <p className="journey-now-title">{now.title}</p>
            </div>
          )}
        </div>

        <div className="journey-listbox">
          <div className="journey-list">
            <div className="journey-track" aria-hidden>
              <span className="journey-fill" />
            </div>
            <ol className="journey-steps">
              {steps.map((step, i) => (
                <li key={step.title} className="journey-step" aria-current={i === open ? 'step' : undefined}>
                  <button type="button" className="journey-card" onClick={() => jump.current?.(i)}>
                    {step.icon ? (
                      <img className="journey-icon" src={step.icon} alt="" />
                    ) : (
                      <span className="journey-icon" aria-hidden />
                    )}
                    <span className="journey-text">
                      <span className="journey-step-title block">{step.title}</span>
                      <span className="journey-more">
                        <span>
                          <span className="journey-step-body block">{step.body}</span>
                        </span>
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
