export function Reducers() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div id="reducers">
      <h1>Reducers</h1>
    </div>
  )
}
