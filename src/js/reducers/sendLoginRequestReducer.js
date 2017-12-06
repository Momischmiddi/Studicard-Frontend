export default function reducer(state={    // reducer schaut KOmponenten an, die mit ihm verbunden sind (das macht React für uns)
    loginResponse: null,
    fetching: false,
    fetched: false,
    error: null,
  }, action) {

    switch (action.type) {
      case "FETCH_LOGIN_REQUEST": {
          return {...state, fetching: true}
      }
      case "FETCH_LOGIN_REQUEST_REJECTED": {
          return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_LOGIN_REQUEST_FULFILLED": {
        return {
            ...state,
            fetching: false,
            fetched: true,
            loginResponse: action.payload,
        }
      }
      case "SET_LOGIN_REQUEST": { // wird im Projekt nicht genutzt, könnte aber genutzt werden, wenn die Variable von einer Komponenten und nicht von einem Request gesetzt wird, dann wäre es kein Asynchroner Tast und die Variable würde sofort gesetzt.
        return {
          ...state,
            loginResponse: action.payload,
        }
      }
    }

    return state
}