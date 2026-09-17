import { motion } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import Carousel from './Carousel'
import { InvertCard, Reveal } from './SectionPrimitives'
import { FacebookIcon, GithubIcon, LinkedinIcon } from './SocialIcons'

export function HeroSection({ loading, onViewWork, profile }) {
  return <section className="hero"><motion.div className="eyebrow" initial={{ opacity: 0, y: 20 }} animate={loading ? {} : { opacity: 1, y: 0 }} transition={{ duration: .5, delay: .08 }}><i /> AVAILABLE FOR SELECT PROJECTS</motion.div><motion.h1 initial={{ opacity: 0, y: 30 }} animate={loading ? {} : { opacity: 1, y: 0 }} transition={{ duration: .7, delay: .16, ease: [.22, 1, .36, 1] }}>Hi, I am Allen<br />a 2nd year student</motion.h1><motion.div className="hero-bottom" initial={{ opacity: 0, y: 20 }} animate={loading ? {} : { opacity: 1, y: 0 }} transition={{ duration: .6, delay: .27, ease: [.22, 1, .36, 1] }}><p><strong>{profile.role}.</strong><span>{profile.location}.</span></p><button className="round-link" onClick={onViewWork} aria-label="View selected work"><ArrowDownRight /></button></motion.div></section>
}

export function AboutSection({ profile, projects, certifications }) {
  const stats = [{ value: `${profile.yearsExperience}+`, label: 'Years of experience' }, { value: String(projects.length).padStart(2, '0'), label: 'Projects shipped' }, { value: String(certifications.length).padStart(2, '0'), label: 'Certifications' }]
  return <section id="about" className="about section"><Reveal><p className="section-label">01 — ABOUT</p><div className="about-grid"><div className="about-portrait" aria-label="Profile photo">{profile.photo ? <img src={profile.photo} alt={profile.name} /> : <div className="about-portrait-placeholder"><small>PROFILE</small><strong>{profile.name.slice(0, 1)}</strong><span>Photo coming soon</span></div>}</div><h2>A little bit<br />about <em>me.</em></h2><div className="about-copy"><p className="lede">{profile.bio}</p><div className="about-stats">{stats.map((stat) => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div><a className="text-link" href="#contact">More about me <ArrowUpRight /></a></div></div></Reveal></section>
}

export function SkillsSection({ skills }) {
  return <section id="skills" className="section"><Reveal><p className="section-label">02 — EXPERTISE</p><h2>These are some of my<br /><em>Skills.</em></h2></Reveal><Carousel label="Skills">{skills.map(([title, sub, level], index) => <Reveal key={`${title}-${index}`} delay={index * .08}><InvertCard><span className="card-number">0{index + 1}</span><h3>{title}</h3><p>{sub}</p><div className="bar"><motion.i initial={{ width: 0 }} whileInView={{ width: `${level}%` }} viewport={{ once: true }} transition={{ duration: .8, delay: index * .08 }} /></div><small>{level}%</small></InvertCard></Reveal>)}</Carousel></section>
}

export function ProjectsSection({ projects }) {
  return <section id="projects" className="section work"><Reveal><div className="section-heading"><div><p className="section-label">03 — SELECTED WORK</p><h2>Things I've<br /><em>made.</em></h2></div><p className="work-intro">A selection of digital experiences shaped by curiosity and care.</p></div></Reveal><Carousel label="Projects" className="carousel-work">{projects.map((project, index) => <Reveal key={`${project.title}-${index}`} delay={index * .08}><InvertCard className="project-card"><div className={`project-visual ${project.tone} ${project.image || project.video ? 'has-media' : ''}`}><span>{project.number}</span>{project.video ? <video src={project.video} muted loop autoPlay playsInline /> : project.image ? <img src={project.image} alt={`${project.title} project preview`} /> : <div className="orb" />}<a href="#contact" aria-label={`Ask about ${project.title}`}><ArrowUpRight /></a></div><div className="project-copy"><p>{project.type}</p><h3>{project.title}</h3><span>{project.desc}</span><div>{project.tags.map(tag => <b key={tag}>{tag}</b>)}</div></div></InvertCard></Reveal>)}</Carousel></section>
}

export function CredentialsSection({ certifications }) {
  return <section id="certifications" className="section credentials"><Reveal><p className="section-label">04 — CREDENTIALS</p><h2>Always<br /><em>learning.</em></h2></Reveal><Carousel label="Credentials" className="carousel-credentials">{certifications.map(({ title, issuer, year, image }, index) => <Reveal key={`${title}-${index}`} delay={index * .08}><InvertCard className="cert"><span className="cert-number">0{index + 1}</span><div className="cert-details"><h3>{title}</h3><p>{issuer}</p><time>{year}</time></div><ArrowUpRight className="cert-link-icon" /><div className="certificate-preview">{image ? <img src={image} alt={`${title} certificate`} /> : <div className="certificate-placeholder"><small>CREDENTIAL PREVIEW</small><strong>{title}</strong><span>{issuer} · {year}</span></div>}</div></InvertCard></Reveal>)}</Carousel></section>
}

export function ContactSection({ profile }) {
  const socialLinks = [{ label: 'GitHub', href: profile.social.github, icon: <GithubIcon /> }, { label: 'LinkedIn', href: profile.social.linkedin, icon: <LinkedinIcon /> }, { label: 'Facebook', href: profile.social.facebook, icon: <FacebookIcon /> }]
  return <section id="contact" className="contact"><Reveal><p className="section-label">05 — CONTACT</p><h2>Have a good<br />idea? <em>Let's talk.</em></h2><a className="email" href={`mailto:${profile.email}`}>{profile.email.toLowerCase()} <ArrowUpRight /></a><div className="socials">{socialLinks.map((item) => <a key={item.label} href={item.href} aria-label={item.label} target="_blank" rel="noopener noreferrer">{item.icon}</a>)}</div></Reveal></section>
}
