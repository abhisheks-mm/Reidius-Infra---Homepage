import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './hero.css'

gsap.registerPlugin(ScrollTrigger)

/* Scroll scene, Figma frame A → frame B. Geometry lives in hero.css; this file only moves two numbers.
   Windows are fractions of the A → B scroll distance (0 = page top, 1 = frame B reached). */
const SCENE = {
  copy: [0, 0.72], // --p: headline and paragraph shrink and rise
  picture: [0.08, 0.9], // --q: person steps closer, sky settles, wash thins
  scrub: 0.8, // seconds the scene takes to catch up with the scrollbar
  ease: 'power1.inOut',
  cover: { scale: 0.94, shade: 0.55 }, // where frame B ends up while the testimonials slide over it
}

/* One entrance on first paint: the copy settles in, then the person rises into frame. */
const INTRO = {
  waitMax: 1200, // ms to wait for webfonts and the person image before starting anyway
  copy: { y: 18, duration: 0.9, stagger: 0.08 },
  person: { yPercent: 10, duration: 1.2, delay: 0.2 },
}

/** Resolves once the webfonts and the person image are ready, or after `ms`, whichever comes first. */
function ready(img, ms) {
  const image = img.complete ? Promise.resolve() : new Promise((r) => img.addEventListener('load', r, { once: true }))
  const fonts = document.fonts?.ready ?? Promise.resolve()
  return Promise.race([Promise.all([image, fonts]), new Promise((r) => setTimeout(r, ms))])
}

export default function Hero() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const section = root.current
    const scene = section.querySelector('.hero-scene')
    const copy = section.querySelectorAll('[data-intro="copy"]')
    const person = section.querySelector('[data-intro="person"]')

    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const mark = (name) => section.querySelector(`[data-mark="${name}"]`)
      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: 'top top', endTrigger: mark('scene'), end: 'top top', scrub: SCENE.scrub },
      })
      tl.set({}, {}, 1) // fixes the timeline length at 1, so positions read as scroll fractions
      const run = (prop, [from, to]) =>
        tl.fromTo(scene, { [prop]: 0 }, { [prop]: 1, ease: SCENE.ease, duration: to - from }, from)
      run('--p', SCENE.copy)
      run('--q', SCENE.picture)

      // Once frame B is reached, the testimonials slide up over it; the scene recedes and darkens.
      gsap
        .timeline({
          scrollTrigger: { trigger: mark('scene'), start: 'top top', endTrigger: mark('cover'), end: 'top top', scrub: true },
        })
        .fromTo(scene, { scale: 1 }, { scale: SCENE.cover.scale, transformOrigin: '50% 0%', ease: 'none' }, 0)
        .fromTo(section.querySelector('.hero-shade'), { opacity: 0 }, { opacity: SCENE.cover.shade, ease: 'none' }, 0)

      // Entrance. Starting states are set before first paint, so nothing flashes.
      gsap.set(copy, { autoAlpha: 0, y: INTRO.copy.y })
      gsap.set(person, { autoAlpha: 0, yPercent: INTRO.person.yPercent })
      let cancelled = false
      ready(person, INTRO.waitMax).then(() => {
        if (cancelled) return
        gsap.to(copy, { autoAlpha: 1, y: 0, duration: INTRO.copy.duration, stagger: INTRO.copy.stagger, ease: 'power3.out' })
        gsap.to(person, { autoAlpha: 1, yPercent: 0, duration: INTRO.person.duration, delay: INTRO.person.delay, ease: 'power3.out' })
      })
      return () => {
        cancelled = true
      }
    })

    return () => mm.revert()
  }, [])

  return (
    <section ref={root} className="hero" aria-labelledby="hero-title">
      <div className="hero-scene">
        <div className="hero-sky" aria-hidden>
          <img
            src="/hero/sky-1400.webp"
            srcSet="/hero/sky-1400.webp 1400w, /hero/sky-2400.webp 2400w"
            sizes="(aspect-ratio <= 1) 300vw, 112vw"
            alt=""
            decoding="async"
          />
        </div>
        <div className="hero-wash" aria-hidden />
        {/* The client plans to turn this picture into a video later. */}
        <div className="hero-person" aria-hidden>
          <img
            data-intro="person"
            src="/hero/homeowner-760.webp"
            srcSet="/hero/homeowner-760.webp 760w, /hero/homeowner-1254.webp 1254w"
            sizes="(aspect-ratio <= 1) 140vw, 43vw"
            alt=""
            fetchPriority="high"
          />
        </div>

        <div className="hero-copy">
          {/* Wide screens break after "without"; portrait screens break after "home" and "making it". */}
          <h1 id="hero-title" className="hero-title" data-intro="copy">
            Build your dream home
            <br className="br-portrait" /> without
            <br className="br-wide" /> making it
            <br className="br-portrait" /> your second job
          </h1>
          <p className="hero-sub" data-intro="copy">
            We plan, build, and manage every step, so you never have to chase a contractor.
          </p>
          <a className="btn btn-dark hero-cta" href="#consultation" data-intro="copy">
            Claim your free consultation
          </a>
        </div>
        <div className="hero-shade" aria-hidden />
      </div>
      <span className="hero-mark" data-mark="scene" aria-hidden />
      <span className="hero-mark" data-mark="cover" aria-hidden />
    </section>
  )
}
