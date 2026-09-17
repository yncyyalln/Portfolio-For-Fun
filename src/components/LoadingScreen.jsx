import { motion } from 'framer-motion'
import './LoadingScreen.css'

export default function LoadingScreen() {
  return <motion.div className="loading-screen" role="status" aria-label="Loading portfolio" exit={{ opacity: 0 }} transition={{ duration: .35, ease: 'easeOut' }}>
    <div className="loader-mark" aria-hidden="true">&lt;/&gt;</div>
    <p>INITIALIZING PORTFOLIO<span className="loader-cursor">_</span></p>
  </motion.div>
}
