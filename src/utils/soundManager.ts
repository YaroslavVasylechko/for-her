const base = import.meta.env.BASE_URL

type SoundName =
  | 'typeClick'
  | 'errorBeep'
  | 'quizCorrect'
  | 'quizWrong'
  | 'noWhoosh'
  | 'victoryChime'
  | 'confettiPop'
  | 'transition'

const fileSounds: Record<string, string> = {
  typeClick: `${base}sounds/dragon-studio-keyboard-typing-sound-435501.mp3`,
  quizCorrect: `${base}sounds/dragon-studio-correct-472358.mp3`,
  quizWrong: `${base}sounds/eritnhut1992-buzzer-or-wrong-answer-20582.mp3`,
  noWhoosh: `${base}sounds/dragon-studio-simple-whoosh-382724.mp3`,
  victoryChime: `${base}sounds/freesound_crunchpixstudio-great-success-384935.mp3`,
  confettiPop: `${base}sounds/the-vampires-monster-male-curiously-saying-surprise-319528.mp3`,
  transition: `${base}sounds/universfield-swoosh-014-383768.mp3`,
}

const POOL_SIZE = 3

class SoundManager {
  private ctx: AudioContext | null = null
  private pools: Map<string, HTMLAudioElement[]> = new Map()
  private muted = false
  private volume = 0.5
  private unlocked = false

  unlock() {
    if (this.unlocked) return
    this.ctx = new AudioContext()
    // Resume context (required by Chrome autoplay policy)
    if (this.ctx.state === 'suspended') {
      void this.ctx.resume()
    }
    this.unlocked = true
  }

  preload() {
    for (const [name, src] of Object.entries(fileSounds)) {
      const pool: HTMLAudioElement[] = []
      for (let i = 0; i < POOL_SIZE; i++) {
        const audio = new Audio(src)
        audio.preload = 'auto'
        audio.volume = this.volume
        pool.push(audio)
      }
      this.pools.set(name, pool)
    }
  }

  play(name: SoundName) {
    if (this.muted) return

    // Programmatic sound via Web Audio API
    if (name === 'errorBeep') {
      this.playErrorBeep()
      return
    }

    // File-based sounds via HTMLAudioElement pool
    const pool = this.pools.get(name)
    if (!pool) return

    const audio = pool.find(a => a.paused || a.ended) ?? pool[0]
    audio.volume = this.volume
    audio.currentTime = 0
    audio.play().catch(() => {})
  }

  setMuted(muted: boolean) {
    this.muted = muted
  }

  private playErrorBeep() {
    if (!this.ctx) return
    const ctx = this.ctx

    const osc = ctx.createOscillator()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(440, ctx.currentTime)
    osc.frequency.linearRampToValueAtTime(220, ctx.currentTime + 0.15)

    const gain = ctx.createGain()
    gain.gain.setValueAtTime(this.volume * 0.3, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.15)

    osc.connect(gain).connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + 0.15)
  }
}

export const soundManager = new SoundManager()
