const app = (state = {page: 'session'}, action) => {
  switch (action.type) {
    case 'SET_NAME':
      return {
        ...state,
        name: action.name
      }
    case 'GOTO_WELCOME':
      return {
        ...state,
        page: 'welcome'
      }
    default:
      return state
  }
}

export default app 

