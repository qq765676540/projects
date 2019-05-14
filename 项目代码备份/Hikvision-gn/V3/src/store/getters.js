export const getParam = (state, param) => {
  return state[param]
}

const limit = 5
export const recentHistory = state => {
  const end = state.history.length
  const begin = end - limit < 0 ? 0 : end - limit
  return state.history
    .slice(begin, end)
    .join(', ')
}
