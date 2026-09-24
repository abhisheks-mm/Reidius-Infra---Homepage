import { useState } from 'react'
import { truth } from '../content'
import StoryPlayer from '../components/StoryPlayer'
import './truth.css'

export default function Truth() {
  const { title, sub, watch, thumb, thumbSmall, youtube, episode } = truth
  const [playing, setPlaying] = useState(null)

  return (
    <section className="truth" aria-labelledby="truth-title">
      <div className="truth-inner">
        <div className="truth-head">
          <h2 id="truth-title" className="truth-title">
            {title}
          </h2>
          <p className="truth-sub">{sub}</p>
        </div>

        <button
          type="button"
          className="truth-media"
          aria-label={`Watch the episode: ${episode}`}
          onClick={() => setPlaying({ name: episode, label: episode, youtube })}
        >
          <img
            src={thumb}
            srcSet={`${thumbSmall} 960w, ${thumb} 1920w`}
            sizes="(aspect-ratio <= 1) 92vw, 75vw"
            alt=""
            loading="lazy"
            decoding="async"
          />
          <span className="story-watch" aria-hidden>
            {watch}
          </span>
        </button>
      </div>

      <StoryPlayer story={playing} onClose={() => setPlaying(null)} />
    </section>
  )
}
