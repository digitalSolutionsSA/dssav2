import { useState } from 'react'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import FullPageScroll from './components/FullPageScroll'
import Hero from './components/Hero'
import IntroScrollSection from './components/IntroScrollSection'
import About from './components/About'
import WhyUs from './components/WhyUs'
import Work from './components/Work'
import Contact from './components/Contact'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'
import { PAGE_MAP } from './utils/navigate'

// Pages that need white nav text
const DARK_NAV_PAGES = new Set([1, 4, 6])

const pages = [
  <Hero />,
  <IntroScrollSection />,
  <About />,
  <WhyUs />,
  <Work />,
  <Contact />,
  <Footer />,
]

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [pageIdx, setPageIdx] = useState(0)

  const navTo = (id: string) => {
    const idx = PAGE_MAP[id]
    if (idx !== undefined) window.dispatchEvent(new CustomEvent('fp:go', { detail: idx }))
  }

  return (
    <>
      <LoadingScreen onComplete={() => setLoaded(true)} />

      {loaded && (
        <>
          <Cursor />
          <Navbar dark={DARK_NAV_PAGES.has(pageIdx)} onNavigate={navTo} />
          <FullPageScroll pages={pages} onPageChange={setPageIdx} />
        </>
      )}
    </>
  )
}
