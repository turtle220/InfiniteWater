import createHistory from 'history/createMemoryHistory'
import configureStore from './store'

export default async (req, res) => {
  const history = createHistory({ initialEntries: [req.originalUrl] })
  const { store, thunk } = configureStore(history)

  await thunk(store) // THE PAYOFF BABY!

  return store
}
