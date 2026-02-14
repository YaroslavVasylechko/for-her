import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import WelcomeScreen from './components/WelcomeScreen'
import Quiz from './components/Quiz'
import LoveAlgorithm from './components/LoveAlgorithm'
import Celebration from './components/Celebration'

type Stage = 'welcome' | 'quiz' | 'algorithm' | 'celebration'

function App() {
  const [stage, setStage] = useState<Stage>('welcome')

  return (
    <>
      <div className="noise-overlay" />
      <AnimatePresence mode="wait">
        {stage === 'welcome' && (
          <WelcomeScreen key="welcome" onStart={() => setStage('quiz')} />
        )}
        {stage === 'quiz' && (
          <Quiz key="quiz" onComplete={() => setStage('algorithm')} />
        )}
        {stage === 'algorithm' && (
          <LoveAlgorithm key="algorithm" onYes={() => setStage('celebration')} />
        )}
        {stage === 'celebration' && (
          <Celebration key="celebration" />
        )}
      </AnimatePresence>
    </>
  )
}

export default App
