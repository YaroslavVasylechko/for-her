import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'

const base = import.meta.env.BASE_URL
const photoFiles = [
  `${base}our-photos/photo_5224456867092828974_y.jpg`,
  `${base}our-photos/photo_5224456867092828975_y.jpg`,
  `${base}our-photos/photo_5224456867092828976_y.jpg`,
  `${base}our-photos/photo_5224456867092828977_y.jpg`,
  `${base}our-photos/photo_5224456867092828978_y.jpg`,
  `${base}our-photos/photo_5224456867092828979_y.jpg`,
  `${base}our-photos/photo_5224456867092828980_y.jpg`,
  `${base}our-photos/photo_5224456867092828981_y.jpg`,
  `${base}our-photos/photo_5224456867092828982_y.jpg`,
  `${base}our-photos/photo_5224456867092828983_y.jpg`,
  `${base}our-photos/photo_5224456867092828984_y.jpg`,
  `${base}our-photos/photo_5224456867092828985_y.jpg`,
  `${base}our-photos/photo_5224456867092828986_y.jpg`,
  `${base}our-photos/photo_5224456867092828987_y.jpg`,
  `${base}our-photos/photo_5224456867092828988_y.jpg`,
  `${base}our-photos/photo_5224456867092828989_y.jpg`,
  `${base}our-photos/photo_5224456867092828990_y.jpg`,
  `${base}our-photos/photo_5224456867092828991_y.jpg`,
  `${base}our-photos/photo_5224456867092828992_y.jpg`,
  `${base}our-photos/photo_5224456867092828993_y.jpg`,
]

export default function Celebration() {
  const [carouselIndex, setCarouselIndex] = useState(0)

  useEffect(() => {
    // Ongoing gentle confetti
    const interval = setInterval(() => {
      confetti({
        particleCount: 3,
        angle: 60 + Math.random() * 60,
        spread: 40,
        origin: { x: Math.random(), y: 0 },
        colors: ['#E11D48', '#FB7185', '#D4A853', '#FFE4E6'],
        gravity: 0.5,
        drift: Math.random() - 0.5,
      })
    }, 400)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIndex(prev => (prev + 1) % photoFiles.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  const today = new Date()
  const dateStr = today.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  // Scattered polaroids positions
  const polaroidPositions = [
    { top: '5%', left: '3%', rotate: -12 },
    { top: '8%', right: '5%', rotate: 8 },
    { bottom: '15%', left: '2%', rotate: 15 },
    { bottom: '10%', right: '3%', rotate: -8 },
    { top: '40%', left: '1%', rotate: -5 },
    { top: '35%', right: '2%', rotate: 10 },
  ]

  return (
    <motion.div
      className="min-h-screen relative overflow-hidden bg-gradient-to-b from-cream via-petal to-blush/30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Scattered Polaroid photos in background */}
      {polaroidPositions.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute hidden lg:block z-10 pointer-events-none"
          style={{
            ...pos,
            rotate: undefined,
          }}
          initial={{ opacity: 0, scale: 0.5, rotate: pos.rotate }}
          animate={{ opacity: 0.7, scale: 1, rotate: pos.rotate }}
          transition={{ delay: 1.5 + i * 0.3, duration: 0.8, ease: 'easeOut' }}
        >
          <div className="bg-white p-1.5 pb-6 shadow-xl w-28 xl:w-36">
            <img
              src={photoFiles[(i * 3) % photoFiles.length]}
              alt=""
              className="w-full aspect-square object-cover"
            />
          </div>
        </motion.div>
      ))}

      {/* Main content */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-16 relative z-20">
        {/* Main title */}
        <motion.div
          className="text-center mb-8"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 150, damping: 15 }}
        >
          <h1 className="font-display text-6xl md:text-8xl font-bold text-rose mb-4 leading-tight">
            Теперь
            <br />
            официально 💘
          </h1>
        </motion.div>

        {/* Bouquet photo */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="relative">
            <div className="bg-white p-3 pb-10 shadow-2xl rounded-sm w-60 md:w-72 mx-auto transform -rotate-2">
              <img
                src={`${base}me-bouquet.png`}
                alt="Букет из моих голов"
                className="w-full aspect-[3/4] object-cover rounded-sm"
              />
              <p className="text-center font-display text-sm text-warm-gray mt-2 italic">
                для тебя 🌸
              </p>
            </div>
            {/* Decorative hearts around photo */}
            <motion.span
              className="absolute -top-4 -right-4 text-3xl"
              animate={{ scale: [1, 1.3, 1], rotate: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              💕
            </motion.span>
            <motion.span
              className="absolute -bottom-2 -left-4 text-2xl"
              animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
            >
              💖
            </motion.span>
          </div>
        </motion.div>

        {/* Photo carousel */}
        <motion.div
          className="mb-10 w-full max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <p className="text-center font-display text-xl text-warm-gray mb-4 italic">
            Наши моменты вместе ✨
          </p>
          <div className="relative h-64 md:h-80 flex items-center justify-center">
            {[-1, 0, 1].map(offset => {
              const idx = (carouselIndex + offset + photoFiles.length) % photoFiles.length
              return (
                <motion.div
                  key={`${carouselIndex}-${offset}`}
                  className="absolute"
                  initial={{
                    scale: offset === 0 ? 0.9 : 0.7,
                    opacity: offset === 0 ? 0 : 0.3,
                    x: offset * 120,
                    rotate: offset * 5,
                  }}
                  animate={{
                    scale: offset === 0 ? 1 : 0.75,
                    opacity: offset === 0 ? 1 : 0.4,
                    x: offset * 120,
                    rotate: offset * 5,
                    zIndex: offset === 0 ? 10 : 5,
                  }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                >
                  <div className="bg-white p-2 pb-8 shadow-xl w-44 md:w-56">
                    <img
                      src={photoFiles[idx]}
                      alt=""
                      className="w-full aspect-square object-cover"
                    />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Valentine certificate */}
        <motion.div
          className="bg-white/80 backdrop-blur-md border-2 border-gold/30 rounded-2xl p-8 md:p-12 max-w-lg w-full text-center shadow-xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <div className="border-2 border-gold/20 rounded-xl p-6 md:p-8">
            <p className="font-mono text-sm text-gold uppercase tracking-[0.3em] mb-4">
              Сертификат подлинности
            </p>

            <div className="w-16 h-px bg-gold/40 mx-auto mb-4" />

            <p className="font-display text-2xl md:text-3xl text-burgundy leading-relaxed mb-6">
              Настоящим подтверждается, что ты —
              <span className="text-rose font-bold italic"> моя единственная валентинка </span>
              на этот и каждый последующий день.
            </p>

            <div className="w-16 h-px bg-gold/40 mx-auto mb-6" />

            <p className="font-body text-warm-gray text-base mb-1">
              {dateStr}
            </p>

            <p className="font-display text-3xl text-rose italic mt-4">
              С любовью, твой Ярополк 💌
            </p>

            <motion.div
              className="mt-6 text-4xl"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              💘
            </motion.div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.p
          className="mt-12 text-warm-gray/50 text-sm font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
        >
          made with love & code • 14.02.2026
        </motion.p>
      </div>
    </motion.div>
  )
}
