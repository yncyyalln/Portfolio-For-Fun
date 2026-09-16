import { useEffect, useState } from 'react'
import { motion, useScroll } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight, BriefcaseBusiness, Code2, Mail, Menu, Moon, Sun, X } from 'lucide-react'
import { profile, skills, projects, certifications } from './data/portfolio'

const nav = ['About', 'Skills', 'Work', 'Credentials', 'Contact']
const Reveal = ({ children, className = '' }) => <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: .65, ease: [.22, 1, .36, 1] }}>{children}</motion.div>

function InvertCard({ children, className = '' }) {
  return <motion.article className={`invert-card ${className}`} whileHover={{ y: -5 }} transition={{ duration: .45, ease: 'easeOut' }}>{children}</motion.article>
}

export default function App() {
  const [dark, setDark] = useState(() => localStorage.theme ? localStorage.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches)
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  useEffect(() => { document.documentElement.classList.toggle('dark', dark); localStorage.theme = dark ? 'dark' : 'light' }, [dark])
  const goto = (name) => { document.getElementById(name.toLowerCase().replace('work', 'projects').replace('credentials', 'certifications'))?.scrollIntoView(); setOpen(false) }
  return <>
    <motion.div className="progress" style={{ scaleX: scrollYProgress }} />
    <header><a className="wordmark" href="#top">{profile.name}<span>.</span></a><nav>{nav.map(n => <button key={n} onClick={() => goto(n)}>{n}</button>)}</nav><div className="header-actions"><button className="icon-button" onClick={() => setDark(!dark)} aria-label="Toggle color theme">{dark ? <Sun /> : <Moon />}</button><button className="icon-button mobile" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button></div></header>
    {open && <div className="mobile-menu">{nav.map(n => <button key={n} onClick={() => goto(n)}>{n}</button>)}</div>}
    <main id="top">
      <section className="hero"><div className="eyebrow"><i /> AVAILABLE FOR SELECT PROJECTS</div><h1>Hi, I am Allen<br /> <em></em>a Professional IT</h1><div className="hero-bottom"><p>{profile.role}.<br />{profile.location}.</p><button className="round-link" onClick={() => goto('Work')} aria-label="View selected work"><ArrowDownRight /></button></div></section>
      <section id="about" className="about section"><Reveal><p className="section-label">01 — ABOUT</p><div className="about-grid"><h2>A little bit<br />about <em>me.</em></h2><div><p className="lede">{profile.bio}</p><a className="text-link" href="#contact">More about me <ArrowUpRight /></a></div></div></Reveal></section>
      <section id="skills" className="section"><Reveal><p className="section-label">02 — EXPERTISE</p><h2>These are some of my<br /><em>Skills.</em></h2></Reveal><div className="skills-grid">{skills.map(([title, sub, level], i) => <Reveal key={title}><InvertCard><span className="card-number">0{i + 1}</span><h3>{title}</h3><p>{sub}</p><div className="bar"><motion.i initial={{ width: 0 }} whileInView={{ width: `${level}%` }} viewport={{ once: true }} transition={{ duration: .8, delay: i * .08 }} /></div><small>{level}%</small></InvertCard></Reveal>)}</div></section>
      <section id="projects" className="section work"><Reveal><div className="section-heading"><div><p className="section-label">03 — SELECTED WORK</p><h2>Things I've<br /><em>made.</em></h2></div><p className="work-intro">A selection of digital experiences shaped by curiosity and care.</p></div></Reveal><div className="project-grid">{projects.map((project, i) => <Reveal key={project.title}><InvertCard className="project-card"><div className={`project-visual ${project.tone}`}><span>{project.number}</span><div className="orb" /><a href="#contact" aria-label={`Ask about ${project.title}`}><ArrowUpRight /></a></div><div className="project-copy"><p>{project.type}</p><h3>{project.title}</h3><span>{project.desc}</span><div>{project.tags.map(t => <b key={t}>{t}</b>)}</div></div></InvertCard></Reveal>)}</div></section>
      <section id="certifications" className="section credentials"><Reveal><p className="section-label">04 — CREDENTIALS</p><h2>Always<br /><em>learning.</em></h2></Reveal><div className="cert-list">{certifications.map(({ title, issuer, year, image }, i) => <Reveal key={title}><InvertCard className="cert"><span>0{i + 1}</span><h3>{title}</h3><p>{issuer}</p><time>{year}</time><ArrowUpRight /><div className="certificate-preview" aria-hidden="true">{image ? <img src={image} alt="" /> : <div className="certificate-placeholder"><small>CREDENTIAL PREVIEW</small><strong>{title}</strong><span>{issuer} · {year}</span></div>}</div></InvertCard></Reveal>)}</div></section>
      <section id="contact" className="contact"><Reveal><p className="section-label">05 — CONTACT</p><h2>Have a good<br />idea? <em>Let's talk.</em></h2><a className="email" href={`mailto:${profile.email}`}>{profile.email} <ArrowUpRight /></a><div className="socials"><a href="https://github.com" aria-label="GitHub"><Code2 /></a><a href="https://linkedin.com" aria-label="LinkedIn"><BriefcaseBusiness /></a><a href={`mailto:${profile.email}`} aria-label="Email"><Mail /></a></div></Reveal></section>
    </main><footer><span>© 2026 {profile.name.toUpperCase()}</span><span>DESIGNED & BUILT WITH INTENTION</span><a href="#top">BACK TO TOP ↑</a></footer>
  </>
}
