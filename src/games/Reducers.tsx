import { useEffect, useReducer } from 'react'

import { emojis } from '../constants/emojis'

const actions: any = {
  PLAY: (state: any) => {
    return { ...state, playing: !state.playing }
  },
  PAUSE: (state: any) => {
    return { ...state, paused: !state.paused }
  },
  GAMEOVER: (state: any) => {
    return { ...state, gameOver: !state.gameOver }
  },
  SELECT_CARD: (state: any, actionPayload: any) => {
    const { selected } = state

    if (selected.length === 2) {
      return { ...state, selected: [] }
    }

    return { ...state, selected: [...selected, actionPayload] }
  },
  SET_MATCHES: (state: any, actionPayload: any) => {
    const { matches } = state

    return { ...state, matches: [...matches, actionPayload] }
  }
}

const reducer = (state: any, action: any) => {
  const { type: actionType, payload: actionPayload } = action

  if (actionType in actions) {
    return actions[actionType](state, actionPayload)
  }

  return state
}

export function Reducers() {
  const [state, dispatch] = useReducer(reducer, {
    playing: false,
    paused: false,
    gameOver: false,
    selected: [],
    matches: []
  })

  function startGame() {
    dispatch({ type: 'PLAY' })
  }

  function playAgain() {
    emojis.sort(() => Math.random() - 0.5)
    dispatch({ type: 'PLAY' })
    dispatch({ type: 'PAUSE' })
    dispatch({ type: 'GAMEOVER' })
  }

  function selectCard(card: string) {
    dispatch({ type: 'SELECT_CARD', payload: card })
  }

  useEffect(() => {
    if (state.selected.length === 2) {
      const [first, second] = state.selected

      if (first.split('|')[1] === second.split('|')[1]) {
        dispatch({ type: 'SET_MATCHES', payload: first })
        dispatch({ type: 'SET_MATCHES', payload: second })
      }

      setTimeout(() => dispatch({ type: 'SELECT_CARD', payload: [] }), 1000)
    }
  }, [state.selected])

  useEffect(() => {
    if (state.matches.length === emojis.length) {
      dispatch({ type: 'GAMEOVER' })
    }
  }, [state.matches])

  return (
    <div id="reducers">
      <h1>Reducers</h1>
      {state.paused && <button onClick={() => dispatch({ type: 'PAUSE' })}>Resume game</button>}
      {!state.playing && <button onClick={startGame}>Start game</button>}
      {state.playing && !state.gameOver && (
        <div className="grid grid-cols-4 gap-4 border border-onyx p-4">
          {emojis.map(card => {
            const [, emo] = card.split('|')
            const disabled = state.matches.includes(card) || state.selected.includes(card)

            return (
              <button
                key={card}
                className="h-24 w-full rounded border p-4 text-center text-4xl"
                disabled={disabled}
                onClick={() => state.selected.length < 2 && selectCard(card)}
              >
                {disabled ? emo : '👀'}
              </button>
            )
          })}
        </div>
      )}
      {state.gameOver && <button onClick={playAgain}>Play again</button>}
    </div>
  )
}
