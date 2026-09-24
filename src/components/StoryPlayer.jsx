import { useEffect, useRef } from 'react'
import './story-player.css'

/** Modal player for a story video: opens when `story` is set, calls `onClose` when dismissed (Close button,
 *  Esc, or a click on the backdrop). `story` is { name, video } for a video file, or { name, youtube } for a
 *  YouTube id (played 16:9 from youtube-nocookie.com). The player unmounts on close, so playback stops. */
export default function StoryPlayer({ story, onClose }) {
  const dialog = useRef(null)

  useEffect(() => {
    if (story) dialog.current.showModal()
  }, [story])

  return (
    <dialog
      ref={dialog}
      className="story-player"
      data-wide={story?.youtube ? '' : undefined}
      aria-label={story ? (story.label ?? `${story.name}’s story`) : undefined}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && dialog.current.close()}
    >
      {story && (
        <>
          {story.youtube ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${story.youtube}?autoplay=1&rel=0`}
              title={story.name}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          ) : (
            <video src={story.video} controls autoPlay playsInline />
          )}
          <div className="story-player-bar">
            <p className="story-player-name">{story.name}</p>
            <button type="button" className="story-player-close" onClick={() => dialog.current.close()}>
              Close
            </button>
          </div>
        </>
      )}
    </dialog>
  )
}
