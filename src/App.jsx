import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll } from 'framer-motion'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { certifications, profile, projects, skills } from './data/portfolio'
import LoadingScreen from './components/LoadingScreen'
import { AboutSection, ContactSection, CredentialsSection, HeroSection, ProjectsSection, SkillsSection } from './components/PortfolioSections'

const navigationItems = ['About', 'Skills', 'Work', 'Credentials', 'Contact']
const sectionIds = { About: 'about', Skills: 'skills', Work: 'projects', Credentials: 'certifications', Contact: 'contact' }

export default function App() {
  const [dark, setDark] = useState(() => localStorage.theme ? localStorage.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.theme = dark ? 'dark' : 'light'
  }, [dark])

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 650)
    return () => window.clearTimeout(timer)
  }, [])

  const scrollToSection = (label) => {
    document.getElementById(sectionIds[label])?.scrollIntoView()
    setIsMenuOpen(false)
  }

  return <>
    <AnimatePresence>{isLoading && <LoadingScreen />}</AnimatePresence>
    <motion.div className="progress" style={{ scaleX: scrollYProgress }} />
    <header><a className="wordmark" href="#top">{profile.name}<span>.</span></a><nav>{navigationItems.map((label) => <button key={label} onClick={() => scrollToSection(label)}>{label}</button>)}</nav><div className="header-actions"><button className="icon-button" onClick={() => setDark(!dark)} aria-label="Toggle color theme">{dark ? <Sun /> : <Moon />}</button><button className="icon-button mobile" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">{isMenuOpen ? <X /> : <Menu />}</button></div></header>
    {isMenuOpen && <div className="mobile-menu">{navigationItems.map((label) => <button key={label} onClick={() => scrollToSection(label)}>{label}</button>)}</div>}
    <motion.main id="top" initial={{ opacity: 0, y: 30 }} animate={isLoading ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }} transition={{ duration: .75, ease: [.22, 1, .36, 1] }}>
      <HeroSection loading={isLoading} onViewWork={() => scrollToSection('Work')} profile={profile} />
      <AboutSection profile={profile} projects={projects} certifications={certifications} />
      <SkillsSection skills={skills} />
      <ProjectsSection projects={projects} />
      <CredentialsSection certifications={certifications} />
      <ContactSection profile={profile} />
    </motion.main>
    <footer><span>© 2026 {profile.name.toUpperCase()}</span><span>DESIGNED & BUILT WITH INTENTION</span><a href="#top">BACK TO TOP ↑</a></footer>
  </>
}
