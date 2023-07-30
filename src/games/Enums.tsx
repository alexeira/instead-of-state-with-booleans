import { useEffect, useState } from 'react'

import { emojis } from '../constants/emojis'

type State = 'start' | 'playing' | 'paused' | 'gameover'

export function Enums() {
  // Now we have only 4 possible states and typescript will help us to avoid mistakes
  const [state, setState] = useState<State>('start')
  const [selected, setSelected] = useState<string[]>([])
  const [matches, setMatches] = useState<string[]>([])

  function startGame() {
    setState('playing')
  }

  function playAgain() {
    emojis.sort(() => Math.random() - 0.5)
    setState('playing')
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
      setState('gameover')
    }
  }, [matches])

  useEffect(() => {
    function handleKeydown(event: KeyboardEvent) {
      console.log(event.key, 'hola')
    }

    document.addEventListener('keydown', handleKeydown)

    return () => document.removeEventListener('keydown', handleKeydown)
  }, [])

  return (
    <div id="enums">
      {state === 'start' && <button onClick={startGame}>Start game</button>}
      {state === 'paused' && <button onClick={() => setState('playing')}>Resume game</button>}
      {state === 'playing' && (
        <div className="grid grid-cols-4 gap-4 border border-onyx p-4">
          {emojis.map(card => {
            const [, emo] = card.split('|')
            const disabled = matches.includes(card) || selected.includes(card)

            return (
              <button
                key={card}
                className="h-24 w-full rounded border p-4 text-center text-4xl"
                onClick={() => selected.length < 2 && selectCard(card)}
              >
                {disabled ? emo : '👀'}
              </button>
            )
          })}
        </div>
      )}
      {state === 'gameover' && <button onClick={playAgain}>Play again</button>}
    </div>
  )
}
