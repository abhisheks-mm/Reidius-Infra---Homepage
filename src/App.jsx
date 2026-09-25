import Hero from './sections/Hero'
import Testimonials from './sections/Testimonials'
import Compare from './sections/Compare'
import Problem from './sections/Problem'
import Trust from './sections/Trust'
import Contractor from './sections/Contractor'
import Journey from './sections/Journey'
import Bento from './sections/Bento'
import Projects from './sections/Projects'
import Truth from './sections/Truth'
import Footer from './sections/Footer'

// Sections are added one at a time, in the order the user gives them.
export default function App() {
  return (
    <>
      <main id="main">
        <Hero />
        <Testimonials />
        <Compare />
        <Problem />
        <Trust />
        <Contractor />
        <Journey />
        <Bento />
        <Projects />
        <Truth />
      </main>
      <Footer />
    </>
  )
}
