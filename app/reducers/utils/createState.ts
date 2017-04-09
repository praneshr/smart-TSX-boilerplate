/**
 * Combine previous and new state and return latest state.
 * @param {Object} state - Previous state.
 * @param {*} payload - New state value.
 * @param {string} key - Key for the new state.
 */

const createState = (state: Object, payload: Object, key: string) => {
  const newState: Object = {
    [key]: payload,
  }
  return { ...state, ...newState }
}

export default createState
