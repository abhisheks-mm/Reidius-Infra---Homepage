// Site copy and media, section by section. Copy follows the Figma file "Claude -> ME"; any change is noted
// above the section it belongs to.

// Figma 530:1058: typical contractor vs Reidius Infra, one row per topic.
export const compare = {
  titleLines: ['No hidden margins.', 'No hidden compromises'],
  topics: ['Materials', 'Changes midway', 'Timeline', 'Design and supervision', 'Accountability'],
  them: {
    labelLines: ['Typical', 'local contractor'],
    titleLines: ['No fixed', 'fee'],
    cells: [
      'Cheaper brand, same bill',
      'Charged extra, or skipped',
      '“Extra kaam” shows up at the end',
      'Deadline slip, costs follow',
      'Thekedar, mistri, supplier. Nobody owns it.',
    ],
  },
  us: {
    labelLines: ['Reidius', 'infra'],
    titleLines: ['No hidden', 'margins'],
    cells: [
      'Wholesale rates, bill in your app',
      'Included, with one project manager',
      'Nothing added without your approval',
      'Handover schedule in your contract',
      'One name, start to finish',
    ],
    extras: ['Dedicated project manager', 'Accurate budget estimate', '2 years free maintenance', 'Every expense on the app'],
  },
}

// Figma 500:2149 ("3rd section", frames 499:1713 → 500:2117): the people you'd otherwise manage stream out of
// "Building your own" and come out of "Building with Reidius" as one chip.
// Each chip has two positions (Figma px, inside the chip cluster): `wide` is Figma's 710 × 182 cluster,
// `tall` is the portrait cluster, which flows downward instead of across.
// Copy changes from Figma: its first four frames label the yellow box "Building your us" and its final frames
// say "Building with Reidius", so the final label is used throughout; and "thats" is written "that’s".
export const problem = {
  title: 'Building a home shouldn’t mean managing 10 different people',
  sub: 'Traditionally, the homeowner becomes the person responsible for bringing everyone together.',
  own: 'Building your own',
  withUs: 'Building with Reidius',
  answer: ['With us, that’s ', 'our', ' job'],
  people: [
    { name: 'Carpenters', wide: [64, 0], tall: [14, 0] },
    { name: 'Supervisor', wide: [251, 0], tall: [124, 0] },
    { name: 'Material Vendors', wide: [435, 0], tall: [26, 132] },
    { name: 'Electricians', wide: [11, 68], tall: [0, 44] },
    { name: 'Plumbers', wide: [201, 68], tall: [118, 44] },
    { name: 'Contractor', wide: [377, 68], tall: [176, 132] },
    { name: 'Architect', wide: [561, 68], tall: [222, 44] },
    { name: 'Extra Labour', wide: [0, 136], tall: [6, 88] },
    { name: 'Interior Designers', wide: [196, 136], tall: [126, 88] },
    { name: 'Labour', wide: [426, 136], tall: [238, 0] },
  ],
}

// Figma 539:1526 (replaces 499:1537): the statement and stats on a house photo, inside a dark card.
// The photo is Figma's; it is only 800 px wide, so it looks soft at full desktop size.
export const trust = {
  lines: ['YOUR VISION. OUR EXPERTISE.', 'FROM OPEN LAND TO A HOME BUILT TO LAST.'],
  photo: '/trust/house.webp',
  stats: [
    { value: '250+', labelLines: ['Homes built in', 'Jaipur'] },
    { value: '50+', labelLines: ['Architects, engineers', 'and designers'] },
    { value: '2 yrs', labelLines: ['Free maintenance', 'after handover'] },
  ],
}

// Figma 500:2189 ("Trust 2"). The Figma card uses the same watermarked stock photo as the testimonials,
// so it shows Sudhesh Verma himself (a still from his reel on the live site), and his face fills the grey
// avatar slot. No video of him is available yet: the Watch button appears once `video` is set.
// Spelling fixed from Figma: "upto", "tyimline", "but" (sentence start), "littrealy", "getting build".
export const contractor = {
  title: 'Even contractors know a dream home needs more than a contractor',
  save: ['Save up to', '20 Lakh Rupees'],
  quote:
    '“It used to take us multiple vendors, people to start working and a lot of manual work just to work under timeline. But Reidius Infra can sort this out - you can literally save 15-20 lakh when your home is getting built.”',
  name: 'Sudhesh Verma',
  role: 'Contractor',
  img: '/stories/sudhesh-verma.webp',
  avatar: '/stories/sudhesh-verma-avatar.webp',
  video: '',
}

// Figma 516:936 ("10 step process", replaces 500:2722): five phases; the open one shows a card, a line and
// four points, and the right panel shows its visual. The phases play one after another on their own while
// the section is on screen; scrolling is never held.
// Figma gives the copy and visual for "Visit & Understand" only. The other four phases' lines and points are
// DRAFTS built from the live site's wording (confirm with the client), and they show phase 1's visual until
// their own arrive: set `visual` (an image) or `video` (a short loop) per phase.
export const journey = {
  titleLines: ['One Partner For Your', 'Entire Home Journey'],
  sub: '10 stages, each signed off with you before the next one starts.',
  phases: [
    {
      title: 'Visit & Understand',
      line: 'Understand → Design → Approve',
      points: [
        'Visit the site and assess the location',
        'Study site conditions, requirements & possibilities',
        'Understand your needs, lifestyle & budget',
        'Conduct a feasibility study before design',
      ],
      visual: '/journey/visit.webp',
    },
    {
      title: 'Design & Plan',
      line: 'Layout → 3D → Estimate',
      points: [
        'Plan the layout around your plot and your family',
        'See your home in 3D before a brick is laid',
        'Get a line-item estimate at wholesale rates',
        'Approvals and permits handled for you',
      ],
    },
    {
      title: 'Build Your Home',
      line: 'Source → Build → Update',
      points: [
        'Materials bought direct, every bill on your app',
        'One project manager runs your site',
        'A report every evening, with photos',
        'A site camera you can open any time',
      ],
    },
    {
      title: 'Check Every Detail',
      line: 'Inspect → Fix → Sign off',
      points: [
        'Each stage inspected against our checklist',
        'Anything off is fixed before the next stage',
        'Finishes and fittings checked one by one',
        'Walk your home with us before handover',
      ],
    },
    {
      title: 'Handover Your Home',
      line: 'Keys → Documents → Care',
      points: [
        'Keys and every document handed over',
        '2 years of free maintenance after handover',
        'A short survey on how each stage went',
        'One number to call after you move in',
      ],
    },
  ],
}

// Figma 504:2841 ("Bento"): the app, in four cards. Images are Figma's (public/app); "finger tip" kept as written.
export const app = {
  titleLines: ['Away from your site?', 'Never away from your home.'],
  subLines: ['Most of our clients build their home from another city. The app is how', 'they stay on site without being there.'],
  cards: {
    daily: { titleLines: ['Get daily updates', 'straight from the site'] },
    manager: {
      titleLines: ['Dedicated Project', 'Manager'],
      body: 'Choose us and get more than just a construction team; gain a dedicated project manager overseeing every detail from start to finish.',
    },
    camera: { titleLines: ['Track your Construction', 'progress in real-time'], body: '24/7 camera surveillance' },
    expenses: { titleLines: ['Track every expense', 'at your finger tip'] },
  },
}

// Figma 504:2864: projects. The Figma pairs one client's name with another client's house, so the list is the
// live site's (renders in public/projects, from v1). Under-construction statuses came unverified from v1: check them.
const home = (client, place, img) => ({ client, place: `${place}, Jaipur`, type: 'Home Construction', img })
export const projects = {
  title: 'Every site we have built, and the ones going up now.',
  tabs: { completed: 'Completed', active: 'Under construction' },
  cta: 'Download Portfolio',
  portfolio: 'https://lp.reidiusinfra.com/assets/content/RI_PortFolio.pdf',
  viewAll: 'View All',
  completed: [
    home('Gopal Sharma', 'Jagatpura', 'gopal-sharma'),
    home('Sanjay Chaudhary', 'Mansarovar', 'sanjay-chaudhary'),
    home('Mayur Gulani', 'Vaishali Nagar', 'mayur-gulani'),
    home('Naveen Sharma', 'Bani Park', 'naveen-sharma'),
    home('Rajendra Rathore', 'Kirni Phatak', 'rajendra-rathore'),
    home('Sonam Vashisth', 'Sanganer', 'sonam-vashisth'),
    home('Umed Singh', 'Vaishali Nagar', 'umed-singh'),
  ],
  active: [
    home('Kamlesh Tiwari', 'Kedia', 'kamlesh-tiwari'),
    home('Aashish Sharma', 'Jagatpura', 'aashish-sharma'),
    home('Anugrah Gupta', 'Jagatpura', 'anugrah-gupta'),
  ],
}

// Figma 504:2905. The episode is "The Dark Side of Construction: Hidden Costs Revealed, Material Commissions |
// UC EP 3" (43:20) on Rajat Vallabh's channel; YouTube is testing other titles and thumbnails on it, and the Figma
// shows the "Material mein chori?" one. The thumbnail is that artwork, cropped clean from the Figma screenshot.
export const truth = {
  title: 'The Truth About Home Construction Nobody Talks About',
  sub: 'A candid conversation about hidden construction costs, quality, transparency and a better way to build.',
  watch: 'Watch',
  thumb: '/stories/truth-ep3.webp',
  thumbSmall: '/stories/truth-ep3-960.webp',
  youtube: 'BkGh9rmFf6U',
  episode: 'The Dark Side of Construction · UC EP 3',
}

// Figma 504:2923 (footer). Links go to this page's sections or the live site's pages; "Payment" has no page yet,
// so it shows as text. Changes from Figma: "FAQa" is written "FAQs". The Figma email is mail@; the live site uses
// info@ — confirm which one is read.
const live = (path) => `https://reidiusinfra.in/${path}`
export const footer = {
  about: 'Architectural design-based construction company in Jaipur (Rajasthan)',
  email: 'mail@reidiusinfra.com',
  phone: '+91 9057344344',
  phoneHref: 'tel:+919057344344',
  columns: [
    {
      title: 'Company',
      links: [
        { label: 'About us', href: live('about.html') },
        { label: 'All Projects', href: '#projects' },
        { label: 'Contact', href: live('contact.html') },
      ],
    },
    {
      title: 'Services',
      links: [
        { label: 'Design & pre-construction', href: '#journey' },
        { label: 'Turnkey construction', href: '#journey' },
        { label: 'Handover & after-care', href: '#journey' },
        { label: 'Construction', href: '#journey' },
      ],
    },
    {
      title: 'Learn',
      links: [
        { label: 'Learn', href: live('blog.html') },
        { label: 'FAQs', href: live('#faqs') },
        { label: 'Payment' },
      ],
    },
  ],
  cta: 'Download Portfolio',
  portfolio: 'https://lp.reidiusinfra.com/assets/content/RI_PortFolio.pdf',
  copyright: '© 2026 Reidius Infra Global. All rights reserved.',
  tagline: ['We own the journey.', 'You own the home.'],
}

// Client story videos, served from the live site's storage (reidiusinfra.in).
const clip = (id) =>
  `https://firebasestorage.googleapis.com/v0/b/ri-website-c476b.firebasestorage.app/o/videos%2F${id}.mp4?alt=media`

// Figma 498:1292 / 498:1389. The Figma cards use watermarked stock photos, so each card shows a frame
// from that client's own video instead. The 1080p stories come first; Akansha's and Amar's clips are 480p.
export const testimonials = {
  title: 'Don’t take our word for it.',
  sub: 'Hear from someone who has experienced this journey with us.',
  items: [
    { name: 'Anil Singh', img: '/stories/anil-singh.webp', video: clip('NqvZK53Dh3cfENNhGd1bg0GH0gk') },
    { name: 'Shashank Sharma', img: '/stories/shashank-sharma.webp', video: clip('xeLDrr4TvafpZAYeZOKLSYMo') },
    { name: 'Rohit', img: '/stories/rohit.webp', video: clip('2sOdHHqtFynj3x6aJ2pzncq28') },
    { name: 'Seema', img: '/stories/seema.webp', video: clip('fPKqbeARCCFOnHy5y5Q9dIoCtrY') },
    { name: 'Shiv Chandrabhan', img: '/stories/shiv-chandrabhan.webp', video: clip('4P3jcIq1dcjWPqaamAshBnLOrI4') },
    { name: 'Akansha Gupta', img: '/stories/akansha-gupta.webp', video: clip('iwEOnj8UrI5K7sSmTgs1NIeGrc') },
    { name: 'Amar Singh', img: '/stories/amar-singh.webp', video: clip('bUhTMBf1OxlZfArusjpt30QPPQY') },
  ],
}
