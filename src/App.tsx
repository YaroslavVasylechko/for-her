import { useState, useRef, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import WelcomeScreen from './components/WelcomeScreen'
import Quiz from './components/Quiz'
import LoveAlgorithm from './components/LoveAlgorithm'
import Celebration from './components/Celebration'
import MuteButton from './components/MuteButton'
import { soundManager } from './utils/soundManager'

type Stage = 'welcome' | 'quiz' | 'algorithm' | 'celebration'

function App() {
  const [stage, setStage] = useState<Stage>('welcome')
  const audioReady = useRef(false)

  const changeStage = useCallback((next: Stage) => {
    if (audioReady.current) {
      soundManager.play('transition')
    }
    setStage(next)
  }, [])

  const handleStart = useCallback(() => {
    if (!audioReady.current) {
      soundManager.unlock()
      soundManager.preload()
      audioReady.current = true
    }
    changeStage('quiz')
  }, [changeStage])

  return (
    <>
      <div className="noise-overlay" />
      <AnimatePresence mode="wait">
        {stage === 'welcome' && (
          <WelcomeScreen key="welcome" onStart={handleStart} />
        )}
        {stage === 'quiz' && (
          <Quiz key="quiz" onComplete={() => changeStage('algorithm')} />
        )}
        {stage === 'algorithm' && (
          <LoveAlgorithm key="algorithm" onYes={() => changeStage('celebration')} />
        )}
        {stage === 'celebration' && (
          <Celebration key="celebration" />
        )}
      </AnimatePresence>
      <MuteButton />
    </>
  )
}

export default App
