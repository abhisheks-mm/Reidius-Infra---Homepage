import SKY from './heroFilmSky'

/* ---------------------------------------------------------------
   Hero film: the client's reidius-motion.mp4 (1618 × 970, 60 fps, 729 frames) drawn on a canvas as the
   visitor scrolls: the homeowner's call, the camera pulling back, the house going up, the finished home.
   The frames are stills taken from the video, every 4th one (183), as WebP in public/hero/motion:
     wide/  the full 1618 × 970 picture, for landscape screens
     tall/  source x 379–1239 (860 wide, centred on the homeowner), for portrait screens
   Stills, not a <video> seeked by scroll: every seek waits on the decoder, which stutters (badly in Firefox,
   and iOS only seeks a video it has been allowed to play). A loaded still draws at once, so the film keeps up
   with the scroll, and between two stills the next one is blended in by the fraction, so it never steps.
   Frame 0 matches the hero's cut-out at Figma frame B exactly (found by image search), which is how the
   hand-off from the Figma scene to the film is seamless: see Hero.jsx.
---------------------------------------------------------------- */

export const FILM = {
  frames: 183,
  src: { w: 1618, h: 970, cx: 809 },
  tallCrop: { x: 379, w: 860 },
  person: { x: 462, y: 332, size: 686 }, // the cut-out's square in frame 0, in source px
  head: 363, // source y of the top of the homeowner's head in frame 0
  // Portrait screens show part of the width: close on the homeowner at first, the whole house by the end
  tall: { from: 520, to: 860, over: [0.12, 0.55] },
  loaders: 6, // stills fetched at once
}

const smooth = (x) => {
  const t = Math.min(1, Math.max(0, x))
  return t * t * (3 - 2 * t)
}

/** Fetch order: frame 0 first, then ever finer passes (every 32nd, 16th … 1st), so a rough film plays early. */
function loadOrder(n) {
  const seen = new Set()
  const out = []
  for (let step = 32; step >= 1; step /= 2) {
    for (let i = 0; i < n; i += step) {
      if (!seen.has(i)) {
        seen.add(i)
        out.push(i)
      }
    }
  }
  return out
}

/**
 * Where the picture goes on a W × H screen at film progress t (0–1), in CSS px.
 * Landscape: full width, bottom-aligned; on screens wider than 5:3 the extra height is cropped around the
 * homeowner's head line, so the head stays where Figma frame B puts it. Portrait: the tall crop, zoomed.
 * Any room left above the picture (dy > 0) is painted as sky.
 */
function place(W, H, tall, t) {
  const { src, tallCrop, head } = FILM
  let shown = src.w
  if (tall) {
    const [a, b] = FILM.tall.over
    shown = FILM.tall.from + (FILM.tall.to - FILM.tall.from) * smooth((t - a) / (b - a))
  }
  const v = W / shown // CSS px per source px
  const dw = (tall ? tallCrop.w : src.w) * v
  const dh = src.h * v
  const cx = tall ? src.cx - tallCrop.x : src.cx
  const dx = W / 2 - cx * v
  const dy = dh <= H ? H - dh : Math.max(H - dh, Math.min(0, head * (H / src.h) - head * v))
  return { v, dx, dy, dw, dh, cropX: tall ? tallCrop.x : 0 }
}

const rgb = ([r, g, b], a = 1) => `rgb(${r} ${g} ${b} / ${a})`

export function createFilm(canvas, scene) {
  const ctx = canvas.getContext('2d', { alpha: true })
  const last = FILM.frames - 1
  const tallQuery = matchMedia('(aspect-ratio <= 1)')
  let tall = tallQuery.matches
  let frames = []
  let generation = 0 // bumped when the set changes or the film is destroyed; stale loads are dropped
  let started = false
  let pos = 0
  let W = 0
  let H = 0
  let r = 1
  let raf = 0

  const url = (i) => `/hero/motion/${tall ? 'tall' : 'wide'}/${String(i).padStart(4, '0')}.webp`

  /** The loaded still nearest to i, or -1. */
  function nearest(i) {
    if (frames[i]) return i
    for (let d = 1; d <= last; d++) {
      if (frames[i - d]) return i - d
      if (frames[i + d]) return i + d
    }
    return -1
  }

  function draw() {
    raf = 0
    if (!W || !H) return
    const i = Math.min(last, Math.max(0, Math.floor(pos)))
    const a = nearest(i)
    if (a < 0) return
    const { dx, dy, dw, dh } = place(W, H, tall, pos / last)
    const sky = SKY[Math.round(pos)] || SKY[0]

    ctx.setTransform(r, 0, 0, r, 0, 0)
    ctx.globalAlpha = 1
    if (dy > 0) {
      // Room above the picture: white at the top edge (as under the hero copy) into the picture's own sky
      const fill = ctx.createLinearGradient(0, 0, 0, dy)
      fill.addColorStop(0, '#fff')
      fill.addColorStop(1, rgb(sky))
      ctx.fillStyle = fill
      ctx.fillRect(0, 0, W, dy + 1)
    }
    ctx.drawImage(frames[a], dx, dy, dw, dh)
    const f = pos - i
    if (a === i && f > 0.01 && frames[i + 1]) {
      ctx.globalAlpha = f
      ctx.drawImage(frames[i + 1], dx, dy, dw, dh)
      ctx.globalAlpha = 1
    }
    if (dy > 0) {
      // Soften the picture's top edge into the painted sky
      const band = Math.min(dh * 0.22, 180)
      const seam = ctx.createLinearGradient(0, dy, 0, dy + band)
      seam.addColorStop(0, rgb(sky))
      seam.addColorStop(1, rgb(sky, 0))
      ctx.fillStyle = seam
      ctx.fillRect(0, dy, W, band)
    }
  }

  const redraw = () => {
    if (!raf) raf = requestAnimationFrame(draw)
  }

  /** Size the canvas to the scene, and hand the cut-out its frame-B box so it matches frame 0 on this screen. */
  function resize() {
    const nowTall = tallQuery.matches
    if (nowTall !== tall) {
      tall = nowTall
      frames = []
      generation++
      if (started) load()
    }
    W = scene.clientWidth
    H = scene.clientHeight
    // No more canvas pixels than the source has across the screen
    r = Math.min(window.devicePixelRatio || 1, Math.max(1, (tall ? FILM.tallCrop.w : FILM.src.w) / W))
    canvas.width = Math.round(W * r)
    canvas.height = Math.round(H * r)

    const { v, dx, dy, cropX } = place(W, H, tall, 0)
    const { person } = FILM
    scene.style.setProperty('--pb-size', `${person.size * v}px`)
    scene.style.setProperty('--pb-top', `${dy + person.y * v}px`)
    scene.style.setProperty('--pb-dx', `${dx + (person.x - cropX + person.size / 2) * v - W / 2}px`)
    draw()
  }

  function load() {
    started = true
    const gen = generation
    const queue = loadOrder(FILM.frames)
    const next = () => {
      if (gen !== generation || !queue.length) return
      const i = queue.shift()
      const img = new Image()
      img.decoding = 'async'
      img.src = url(i)
      img
        .decode()
        .then(() => {
          if (gen !== generation) return
          frames[i] = img
          // Redraw if this still is now the nearest to where the film is, or the one being blended in
          const want = Math.floor(pos)
          if (nearest(want) === i || i === want + 1) redraw()
        })
        .catch(() => {})
        .finally(next)
    }
    for (let k = 0; k < FILM.loaders; k++) next()
  }

  const observer = new ResizeObserver(resize)
  observer.observe(scene)
  resize()

  return {
    last,
    /** Show the film at a frame position between 0 and `last` (fractions blend two stills). */
    show(p) {
      pos = Math.min(last, Math.max(0, p))
      draw()
    },
    load() {
      if (!started) load()
    },
    destroy() {
      generation++
      observer.disconnect()
      cancelAnimationFrame(raf)
      frames = []
      ;['--pb-size', '--pb-top', '--pb-dx'].forEach((p) => scene.style.removeProperty(p))
    },
  }
}
