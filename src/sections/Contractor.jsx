import { useState } from 'react'
import { contractor } from '../content'
import StoryPlayer from '../components/StoryPlayer'
import './contractor.css'

export default function Contractor() {
  const { title, save, quote, name, role, img, avatar, video } = contractor
  const [playing, setPlaying] = useState(null)

  return (
    <section className="contractor" aria-labelledby="contractor-title">
      <div className="contractor-inner">
        <h2 id="contractor-title" className="contractor-title">
          {title}
        </h2>

        <div className="contractor-row">
          <div className="contractor-card">
            <img src={img} alt={`${name}, ${role.toLowerCase()}`} loading="lazy" decoding="async" />
            {video && (
              <button
                type="button"
                className="story-watch"
                aria-label={`Watch ${name}’s story`}
                onClick={() => setPlaying({ name, video })}
              >
                Watch
              </button>
            )}
          </div>

          <figure className="contractor-text">
            <p className="contractor-save">
              {save.map((line) => (
                <span key={line}>{line} </span>
              ))}
            </p>
            <blockquote className="contractor-quote">{quote}</blockquote>
            <figcaption className="contractor-who">
              <img className="contractor-avatar" src={avatar} alt="" loading="lazy" decoding="async" />
              <span>
                <span className="contractor-name block">{name}</span>
                <span className="contractor-role block">{role}</span>
              </span>
            </figcaption>
          </figure>
        </div>
      </div>

      <StoryPlayer story={playing} onClose={() => setPlaying(null)} />
    </section>
  )
}
