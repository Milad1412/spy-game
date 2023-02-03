import { useState } from 'react'
import StartGame from './StartGame'

const GameContainer = () => {
  const [isGameStarted, setIsGameStarted] = useState(false)

  return (
    <div className="h-screen">
      {!isGameStarted && (
        <StartGame onGameStart={() => setIsGameStarted(true)} />
      )}
    </div>
  )
}

export default GameContainer
