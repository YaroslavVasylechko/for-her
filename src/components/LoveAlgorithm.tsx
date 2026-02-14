import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

interface LoveAlgorithmProps {
  onYes: () => void
}

const terminalLines = [
  { text: '> booting love-runtime v1.0.14...', delay: 0 },
  { text: '  initializing emotional kernel...', delay: 600 },
  { text: '  loading core modules: trust, chaos, cuddles...', delay: 1200 },
  { text: '  done.', delay: 1800 },
  { text: '', delay: 2200 },

  { text: '> mounting memory.fs...', delay: 2600 },
  { text: '  found: 124 shared moments', delay: 3200 },
  { text: '  indexing smiles... ok', delay: 3600 },
  { text: '  indexing eye contact... ok', delay: 4000 },
  { text: '', delay: 4400 },

  { text: '> running compatibility diagnostics...', delay: 4800 },
  { text: '  syncing heartbeats... 98ms latency', delay: 5400 },
  { text: '  aligning life vectors...', delay: 5800 },
  { text: '  resolving future dependencies...', delay: 6200 },
  { text: '  done.', delay: 6600 },
  { text: '', delay: 7000 },

  { text: '> compiling love-engine...', delay: 7400 },
  { text: '  bundling feelings...', delay: 7800 },
  { text: '  tree-shaking insecurities...', delay: 8200 },
  { text: '  minifying distance...', delay: 8600 },
  { text: '  build successful.', delay: 9000 },
  { text: '', delay: 9400 },

  { text: '> running final checks...', delay: 9800 },
  { text: '  kindness.............. OK', delay: 10200 },
  { text: '  chaos tolerance....... OK', delay: 10600 },
  { text: '  hug throughput........ MAX', delay: 11000 },
  { text: '', delay: 11400 },

  { text: '════════ system report ════════', delay: 11800 },
  { text: '  match_score: 0.999999', delay: 12200 },
  { text: '  stability: production-ready', delay: 12600 },
  { text: '  uptime_forecast: forever', delay: 13000 },
  { text: '  cuddle_queue: ∞', delay: 13400 },
  { text: '═══════════════════════════════', delay: 13800 },
  { text: '', delay: 14200 },

  { text: '⚠ runtime exception detected', delay: 14600 },
  { text: '  missing required argument:', delay: 15000 },
  { text: '', delay: 15400 },
  { text: '  be_my_valentine = ?', delay: 16000 },
]

export default function LoveAlgorithm({ onYes }: LoveAlgorithmProps) {
  const [visibleLines, setVisibleLines] = useState(0)
  const [showButtons, setShowButtons] = useState(false)
  const [noPos, setNoPos] = useState({ x: 0, y: 80 })
  const [noRunCount, setNoRunCount] = useState(0)

  const buttonsAreaRef = useRef<HTMLDivElement>(null)
  const terminalBodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    terminalLines.forEach((line, i) => {
      const timer = setTimeout(() => {
        setVisibleLines(i + 1)
        if (i === terminalLines.length - 1) {
          setTimeout(() => setShowButtons(true), 600)
        }
      }, line.delay)
      timers.push(timer)
    })

    return () => timers.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop =
        terminalBodyRef.current.scrollHeight
    }
  }, [visibleLines])

  const handleNoHover = useCallback(() => {
    const area = buttonsAreaRef.current
    if (!area) return

    const rect = area.getBoundingClientRect()
    const padding = 60

    const maxX = rect.width / 2 - padding
    const maxY = rect.height / 2 - padding

    const randX = (Math.random() * 2 - 1) * maxX
    const randY = (Math.random() * 2 - 1) * maxY

    setNoPos({
      x: Math.max(-maxX, Math.min(maxX, randX)),
      y: Math.max(-maxY, Math.min(maxY, randY)),
    })

    setNoRunCount(prev => prev + 1)
  }, [])

  const handleYes = useCallback(() => {
    const duration = 3000
    const end = Date.now() + duration

    const frame = () => {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
      })
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
      })

      if (Date.now() < end) requestAnimationFrame(frame)
    }

    frame()
    setTimeout(onYes, 2000)
  }, [onYes])

  const noMessages = [
    'Нет 😤',
    'Ты уверена? 🥺',
    'Подумай ещё раз 😢',
    'Ну пожааалуйста 🥹',
    'Я не приму отказ!',
    'Кнопка сломалась 😈',
    'Попробуй ещё 😏',
    '💔💔💔',
  ]

  const getLineClass = (text: string) => {
    if (text.includes('> '))
      return 'text-rose-400 font-semibold'

    if (
      text.includes('done') ||
      text.includes('successful') ||
      text.includes('OK')
    )
      return 'text-green-400'

    if (text.includes('exception'))
      return 'text-red-400 font-bold'

    if (text.includes('system report'))
      return 'text-amber-400 font-semibold'

    if (
      text.includes('match_score') ||
      text.includes('stability') ||
      text.includes('uptime') ||
      text.includes('cuddle_queue')
    )
      return 'text-emerald-300'

    if (text.includes('be_my_valentine'))
      return 'text-amber-400 text-2xl font-bold'

    if (text.includes('═'))
      return 'text-amber-400/40'

    return 'text-white/80'
  }

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#2b0a18] via-[#3b0f23] to-[#2b0a18] p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="w-full max-w-2xl">
        {/* Terminal */}
        <motion.div
          className="bg-[#111827] rounded-xl overflow-hidden shadow-2xl border border-white/10"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <div className="flex items-center gap-2 px-4 py-3 bg-[#0f172a] border-b border-white/10">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-3 text-white/40 text-sm font-mono">
              love_algorithm.exe
            </span>
          </div>

          <div
            ref={terminalBodyRef}
            className="p-6 font-mono text-base leading-relaxed max-h-[60vh] overflow-y-auto"
          >
            {terminalLines
              .slice(0, visibleLines)
              .map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={getLineClass(line.text)}
                >
                  {line.text || '\u00A0'}
                </motion.div>
              ))}

            {visibleLines < terminalLines.length && (
              <motion.span
                className="inline-block w-3 h-6 bg-green-400 ml-1"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity }}
              />
            )}
          </div>
        </motion.div>

        {/* Buttons */}
        <AnimatePresence>
          {showButtons && (
            <motion.div
              ref={buttonsAreaRef}
              className="relative mt-12 h-[220px]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="relative flex items-center justify-center h-full">
                {/* YES */}
                <motion.button
                  onClick={handleYes}
                  className="z-20 bg-gradient-to-r from-rose-600 to-pink-500
                             text-white text-xl px-14 py-5 rounded-2xl
                             shadow-lg hover:scale-110"
                  style={{ padding: '0.3rem 0.8rem' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Да 💘
                </motion.button>

                {/* NO */}
                <motion.button
                  onMouseEnter={handleNoHover}
                  onTouchStart={handleNoHover}
                  className="absolute left-1/2 top-1/2
                             -translate-x-1/2 -translate-y-1/2
                             bg-white/10 text-white/60
                             text-lg px-10 py-4 rounded-2xl
                             border border-white/20 whitespace-nowrap"
                  style={{ padding: '0.3rem 0.8rem' }}
                  animate={{ x: noPos.x, y: noPos.y }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  {noMessages[
                    Math.min(noRunCount, noMessages.length - 1)
                  ]}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
