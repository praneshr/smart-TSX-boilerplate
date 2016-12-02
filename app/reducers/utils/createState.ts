/**
 * Combine previous and new state and return latest state.
 * @param {Object} state - Previous state.
 * @param {*} payload - New state value.
 * @param {string} key - Key for the new state.
 */
declare const Object: any

export default (state: Object, payload: Object, key: string) => {
  const newState: Object = {
    [key]: payload
  }
  return Object.assign({}, state, newState)
}
