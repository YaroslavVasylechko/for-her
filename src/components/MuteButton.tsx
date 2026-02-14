import { useState } from 'react'
import { motion } from 'framer-motion'
import { soundManager } from '../utils/soundManager'

export default function MuteButton() {
  const [muted, setMuted] = useState(false)

  const toggle = () => {
    const next = !muted
    setMuted(next)
    soundManager.setMuted(next)
  }

  return (
    <motion.button
      onClick={toggle}
      className="fixed bottom-4 right-4 z-50 w-12 h-12 rounded-full
                 bg-white/20 backdrop-blur-sm border border-white/30
                 flex items-center justify-center text-xl
                 hover:bg-white/30 transition-colors cursor-pointer"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, type: 'spring' }}
      whileTap={{ scale: 0.9 }}
      aria-label={muted ? 'Unmute' : 'Mute'}
    >
      {muted ? '🔇' : '🔊'}
    </motion.button>
  )
}
