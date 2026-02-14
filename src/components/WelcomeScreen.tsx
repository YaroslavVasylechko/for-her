import { motion } from 'framer-motion'

interface WelcomeScreenProps {
  onStart: () => void
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8 }}
    >
      {/* Floating hearts background */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-rose-light/30 select-none pointer-events-none"
          style={{
            fontSize: `${Math.random() * 30 + 14}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, Math.random() > 0.5 ? 15 : -15, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: Math.random() * 3 + 3,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'easeInOut',
          }}
        >
          ♥
        </motion.div>
      ))}

      {/* Main content */}
      <motion.div
        className="text-center z-10 px-6"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
      >
        <motion.div
          className="text-7xl mb-6"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          💌
        </motion.div>

        <h1 className="font-display text-5xl md:text-7xl font-bold text-burgundy mb-4 leading-tight">
          У меня есть
          <br />
          <motion.span
            className="text-rose italic"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            один вопрос...
          </motion.span>
        </h1>

        <motion.p
          className="text-warm-gray text-xl md:text-2xl mb-10 max-w-md mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          Но сначала — маленький квиз о нас.
          <br />
          Готова? 😏
        </motion.p>

        <motion.button
          onClick={onStart}
          className="bg-rose text-white font-body font-semibold text-xl px-14 py-5 rounded-2xl
                     shadow-lg shadow-rose/30 hover:bg-rose-dark hover:shadow-xl hover:shadow-rose/40
                     transition-all duration-300 cursor-pointer"
          style={{ padding: '0.3rem 0.8rem' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Начать 💕
        </motion.button>
      </motion.div>

      {/* Decorative corner elements */}
      <motion.div
        className="absolute top-8 left-8 w-20 h-20 border-t-2 border-l-2 border-gold/40 rounded-tl-lg"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      />
      <motion.div
        className="absolute bottom-8 right-8 w-20 h-20 border-b-2 border-r-2 border-gold/40 rounded-br-lg"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
      />
    </motion.div>
  )
}
