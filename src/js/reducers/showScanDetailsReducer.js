export default function reducer(state={    // reducer schaut KOmponenten an, die mit ihm verbunden sind (das macht React für uns)
    scanDetails: null,
    fetching: false,
    fetched: false,
    error: null,
  }, action) {

    switch (action.type) {
      case "FETCH_SCAN_DETAILS": {
          return {...state, fetching: true}
      }
      case "FETCH_SCAN_DETAILS_REJECTED": {
          return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_SCAN_DETAILS_FULFILLED": {
        return {
            ...state,
            fetching: false,
            fetched: true,
            scanDetails: action.payload,
        }
      }
      case "SET_SCAN_DETAILS": { // wird im Projekt nicht genutzt, könnte aber genutzt werden, wenn die Variable von einer Komponenten und nicht von einem Request gesetzt wird, dann wäre es kein Asynchroner Tast und die Variable würde sofort gesetzt.
        return {
          ...state,
            scanDetails: action.payload,
        }
      }
    }

    return state
}