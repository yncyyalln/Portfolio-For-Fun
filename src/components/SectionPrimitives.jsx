import { motion } from 'framer-motion'

export function Reveal({ children, className = '', delay = 0 }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: .18 }} transition={{ duration: .7, delay, ease: [.22, 1, .36, 1] }}>{children}</motion.div>
}

export function InvertCard({ children, className = '' }) {
  return <motion.article className={`invert-card ${className}`} whileHover={{ y: -5 }} transition={{ duration: .45, ease: 'easeOut' }}>{children}</motion.article>
}
