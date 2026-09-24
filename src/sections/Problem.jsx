import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { problem } from '../content'
import './problem.css'

gsap.registerPlugin(ScrollTrigger)

/* Scrubbed, not pinned: runs from the moment the boxes enter the screen until the section's bottom reaches
   the bottom of the screen, so it has finished by the time the next section shows.
   Windows are fractions of that scroll distance. Everything is done by 0.92, so the scrub's catch-up
   (a fraction of a second) still lands before the next section appears. */
const FLOW = {
  boxes: [0, 0.28], // --pb: the boxes slide in from the screen edges and meet
  chips: [0.22, 0.9], // --pc: the people stream through the white box
  answer: [0.62, 0.92], // --pd: the dark chip comes out of the yellow box's edge and settles
  scrub: 0.4,
}

export default function Problem() {
  const root = useRef(null)
  const { title, sub, own, withUs, answer, people } = problem

  useLayoutEffect(() => {
    const section = root.current
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section.querySelector('.problem-mark'),
          start: 'top bottom',
          endTrigger: section,
          end: 'bottom bottom',
          scrub: FLOW.scrub,
        },
      })
      tl.set({}, {}, 1) // fixes the timeline length at 1, so positions read as scroll fractions
      const run = (prop, [from, to], ease) =>
        tl.fromTo(section, { [prop]: 0 }, { [prop]: 1, ease, duration: to - from }, from)
      run('--pb', FLOW.boxes, 'power2.out')
      run('--pc', FLOW.chips, 'none')
      run('--pd', FLOW.answer, 'power2.out')
    })
    return () => mm.revert()
  }, [])

  return (
    <section ref={root} className="problem" aria-labelledby="problem-title">
      <div className="problem-inner">
        <div className="problem-head">
          <h2 id="problem-title" className="problem-title">
            {title}
          </h2>
          <p className="problem-sub">{sub}</p>
        </div>

        <div className="problem-box problem-own">
          <h3 className="problem-label">{own}</h3>
          <ul className="problem-people" aria-label="Who you manage yourself">
            {people.map(({ name, wide, tall }) => (
              <li
                key={name}
                className="problem-chip"
                style={{ '--wide-x': wide[0], '--wide-y': wide[1], '--tall-x': tall[0], '--tall-y': tall[1] }}
              >
                {name}
              </li>
            ))}
          </ul>
        </div>

        <div className="problem-box problem-us">
          <h3 className="problem-label">{withUs}</h3>
          <p className="problem-answer">
            <img src="/icons/ri-mark.svg" alt="" width="20" height="19" />
            <span>
              {answer[0]}
              <strong>{answer[1]}</strong>
              {answer[2]}
            </span>
          </p>
        </div>

        <span className="problem-mark" aria-hidden />
      </div>
    </section>
  )
}
