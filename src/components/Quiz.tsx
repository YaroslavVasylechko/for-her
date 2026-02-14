import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import clsx from 'clsx'

interface QuizProps {
  onComplete: () => void
}

interface Question {
  question: string
  options: string[]
  correctIndex: number
  bg: string
  accent: string
  emoji: string
}

const questions: Question[] = [
  {
    question: 'Что я заметил в тебе первым?',
    options: ['Твою улыбку ☀️', 'Твои глаза 👀', 'Твой смех 😄', 'Всё сразу 💫'],
    correctIndex: 3,
    bg: 'bg-gradient-to-br from-petal via-blush to-rose-light/20',
    accent: 'border-rose',
    emoji: '👁️',
  },
  {
    question: 'Как ты думаешь, почему я выбрал именно тебя?',
    options: ['Потому что ты особенная ✨', 'Потому что судьба 🌙', 'Потому что не мог не выбрать 🧲', 'Все варианты верные 💘'],
    correctIndex: 3,
    bg: 'bg-gradient-to-bl from-lavender via-petal to-sky-soft/30',
    accent: 'border-purple-400',
    emoji: '💜',
  },
  {
    question: 'Если бы мы были фильмом, то каким жанром?',
    options: ['Романтическая комедия 😂', 'Приключенческий фильм 🗺️', 'Мелодрама со счастливым концом 🎬', 'Фэнтези — слишком волшебно 🧙‍♂️'],
    correctIndex: 0,
    bg: 'bg-gradient-to-tr from-sunset via-peach to-cream',
    accent: 'border-amber-500',
    emoji: '🎬',
  },
  {
    question: 'Какое наше воспоминание ты считаешь самым тёплым?',
    options: ['Наше первое свидание 🌹', 'Когда мы впервые обнялись 🤗', 'Случайный вечер вместе 🌆', 'Каждое мгновение с тобой 💛'],
    correctIndex: 3,
    bg: 'bg-gradient-to-br from-mint via-cream to-sky-soft/20',
    accent: 'border-emerald-400',
    emoji: '🌿',
  },
  {
    question: 'Когда ты поняла, что между нами что-то особенное?',
    options: ['С первого взгляда 👀', 'Когда мы не могли перестать болтать 💬', 'Когда скучала уже через минуту 😢', 'Это случилось незаметно 🦋'],
    correctIndex: 3,
    bg: 'bg-gradient-to-bl from-sky-soft via-lavender/30 to-petal',
    accent: 'border-sky-400',
    emoji: '🦋',
  },
  {
    question: 'Кто дольше выбирает еду в меню?',
    options: ['Конечно ты! 🤔', 'Хм... наверное я 😅', 'Оба залипаем на 20 минут 😂', 'Мы просто берём всё! 🍕'],
    correctIndex: 2,
    bg: 'bg-gradient-to-tr from-peach via-sunset/50 to-cream',
    accent: 'border-orange-400',
    emoji: '🍽️',
  },
  {
    question: 'Кто больше любит обнимашки?',
    options: ['Я — главный обнимашка 🤗', 'Ты! Ты вечно прижимаешься 🥰', 'Оба! Мы как пазлы 🧩', 'Это не обсуждается — обнимашки вне конкуренции 💕'],
    correctIndex: 2,
    bg: 'bg-gradient-to-br from-blush via-petal to-lavender/30',
    accent: 'border-pink-400',
    emoji: '🤗',
  },
  {
    question: 'Кто первым мирится после мини-ссоры?',
    options: ['Я, конечно — не могу злиться на тебя 😤➡️🥺', 'Ты — ты слишком добрая 👼', 'Мы оба — через 5 минут уже смеёмся 😂', 'У нас нет ссор (ха-ха, ладно...) 😇'],
    correctIndex: 2,
    bg: 'bg-gradient-to-bl from-mint/50 via-cream to-sunset/30',
    accent: 'border-teal-400',
    emoji: '🕊️',
  },
  {
    question: 'Ты готова к финальному вопросу? 😏',
    options: ['Да! Давай! 🔥', 'Немного страшно, но да 😬', 'Я родилась готовой 😎', 'А что будет? 👀'],
    correctIndex: -1, // All answers are correct for this one
    bg: 'bg-gradient-to-br from-rose/10 via-petal to-gold-light/30',
    accent: 'border-rose',
    emoji: '🎯',
  },
]

// Floating photo that appears randomly
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

export default function Quiz({ onComplete }: QuizProps) {
  const [currentQ, setCurrentQ] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showPhoto, setShowPhoto] = useState(false)
  const [photoIndices, setPhotoIndices] = useState<[number, number]>([0, 1])

  const fireConfetti = useCallback(() => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#E11D48', '#FB7185', '#D4A853', '#FDF2F8', '#FFE4E6'],
    })
  }, [])

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return
    setSelectedAnswer(index)

    const q = questions[currentQ]
    if (q.correctIndex === -1 || index === q.correctIndex) {
      fireConfetti()
    }

    // Show two random photos after each answer (except the last question)
    if (currentQ < questions.length - 1) {
      const first = Math.floor(Math.random() * photoFiles.length)
      let second = Math.floor(Math.random() * (photoFiles.length - 1))
      if (second >= first) second++
      setPhotoIndices([first, second])
      setShowPhoto(true)
      setTimeout(() => setShowPhoto(false), 2500)
    }

    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ(prev => prev + 1)
        setSelectedAnswer(null)
      } else {
        onComplete()
      }
    }, 1800)
  }

  const q = questions[currentQ]
  const progress = ((currentQ + 1) / questions.length) * 100

  return (
    <motion.div
      className="min-h-screen flex flex-col relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1.5 bg-blush/50">
        <motion.div
          className="h-full bg-gradient-to-r from-rose to-gold rounded-r-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>

      {/* Question counter */}
      <div className="fixed top-6 right-6 z-50">
        <span className="font-mono text-base text-warm-gray bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
          {currentQ + 1} / {questions.length}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ}
          className={clsx(
            'min-h-screen flex flex-col items-center justify-center px-4 py-16 transition-colors duration-700',
            q.bg
          )}
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -80 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {/* Question emoji */}
          <motion.div
            className="text-6xl mb-6"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            {q.emoji}
          </motion.div>

          {/* Question */}
          <motion.h2
            className="font-display text-4xl md:text-5xl font-bold text-burgundy text-center mb-10 max-w-xl leading-snug"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {q.question}
          </motion.h2>

          {/* Options */}
          <div className="grid gap-3 w-full max-w-lg">
            {q.options.map((option, i) => {
              const isSelected = selectedAnswer === i
              const isCorrect = q.correctIndex === -1 || i === q.correctIndex
              const showResult = selectedAnswer !== null

              return (
                <motion.button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={selectedAnswer !== null}
                  className={clsx(
                    'text-left px-6 py-5 rounded-2xl font-body text-lg md:text-xl',
                    'border-2 transition-all duration-300 cursor-pointer',
                    'backdrop-blur-sm',
                    !showResult && 'bg-white/70 border-white/50 hover:border-rose-light hover:bg-white/90 hover:shadow-md',
                    showResult && isSelected && isCorrect && 'bg-rose/10 border-rose text-rose-dark shadow-md',
                    showResult && isSelected && !isCorrect && 'bg-warm-gray/10 border-warm-gray/50 text-warm-gray',
                    showResult && !isSelected && isCorrect && 'bg-rose/5 border-rose/30',
                    showResult && !isSelected && !isCorrect && 'opacity-50',
                  )}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                  whileHover={!showResult ? { scale: 1.02, x: 4 } : {}}
                  whileTap={!showResult ? { scale: 0.98 } : {}}
                >
                  <span className="flex items-center gap-3">
                    <span className={clsx(
                      'w-9 h-9 rounded-full flex items-center justify-center text-base font-semibold shrink-0',
                      !showResult && 'bg-blush text-rose',
                      showResult && isSelected && isCorrect && 'bg-rose text-white',
                      showResult && isSelected && !isCorrect && 'bg-warm-gray/30 text-warm-gray',
                      showResult && !isSelected && 'bg-blush/50 text-rose-light',
                    )}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    {option}
                  </span>
                </motion.button>
              )
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Floating Polaroid photos */}
      <AnimatePresence>
        {showPhoto && (
          <motion.div
            className="fixed z-40 pointer-events-none flex gap-4 items-start"
            style={{
              top: '15%',
              right: '5%',
            }}
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, y: 30 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <motion.div
              initial={{ rotate: -8 }}
              animate={{ rotate: -6 }}
            >
              <div className="bg-white p-2 pb-10 shadow-2xl rounded-sm w-52 md:w-64">
                <img
                  src={photoFiles[photoIndices[0]]}
                  alt="Our memory"
                  className="w-full aspect-square object-cover rounded-sm"
                />
                <p className="text-center font-display text-sm text-warm-gray mt-1 italic">
                  наши моменты 💕
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ rotate: 8 }}
              animate={{ rotate: 5 }}
            >
              <div className="bg-white p-2 pb-10 shadow-2xl rounded-sm w-52 md:w-64">
                <img
                  src={photoFiles[photoIndices[1]]}
                  alt="Our memory"
                  className="w-full aspect-square object-cover rounded-sm"
                />
                <p className="text-center font-display text-sm text-warm-gray mt-1 italic">
                  наши моменты 💕
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
