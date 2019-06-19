// Thunk
export const signup = name => dispatch => (
  Promise.resolve(
    dispatch({
      type: 'SET_NAME',
      name})))

// regular
export const gotoWelcome = () => ({
  type: 'GOTO_WELCOME'
})
