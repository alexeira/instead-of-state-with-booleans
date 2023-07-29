import { useEffect, useState } from 'react'

import { emojis } from '../../constants/emojis'

export function Booleans() {
  const [playing, setPlaying] = useState(false)
  const [paused, setPaused] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [selected, setSelected] = useState<string[]>([])
  const [matches, setMatches] = useState<string[]>([])

  function startGame() {
    setPlaying(play => !play)
  }

  function playAgain() {
    emojis.sort(() => Math.random() - 0.5)
    setPlaying(true)
    setPaused(false)
    setGameOver(false)
  }

  function selectCard(card: string) {
    setSelected([...selected, card])
  }

  useEffect(() => {
    if (selected.length === 2) {
      const [first, second] = selected

      if (first.split('|')[1] === second.split('|')[1]) {
        setMatches(prevMatches => [...prevMatches, first, second])
      }

      setTimeout(() => setSelected([]), 1000)
    }
  }, [selected])

  useEffect(() => {
    if (matches.length === emojis.length) {
      setGameOver(gameOver => !gameOver)
    }
  }, [matches])

  return (
    <>
      {!playing && <button onClick={startGame}>Start game</button>}
      {playing && !gameOver && (
        <div className="grid grid-cols-4 gap-4 border border-onyx p-4">
          {emojis.map(card => {
            const [, emo] = card.split('|')
            const disabled = matches.includes(card) || selected.includes(card)

            return (
              <button
                key={card}
                className="h-24 w-full rounded border p-4 text-center text-4xl"
                disabled={disabled}
                onClick={() => selected.length < 2 && selectCard(card)}
              >
                {disabled ? emo : '👀'}
              </button>
            )
          })}
        </div>
      )}
      {gameOver && <button onClick={playAgain}>Play again</button>}
    </>
  )
}
