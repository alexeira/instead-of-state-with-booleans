export const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🐻', '🐼', '🐨']
  .flatMap(e => [`a|${e}`, `b|${e}`])
  .sort(() => Math.random() - 0.5)
