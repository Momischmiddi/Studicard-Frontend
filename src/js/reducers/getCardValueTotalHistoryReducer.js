export default function reducer(state={    // reducer schaut KOmponenten an, die mit ihm verbunden sind (das macht React für uns)
    cardValueTotalHistory: null,
    fetching: false,
    fetched: false,
    error: null,
  }, action) {

    switch (action.type) {
      case "FETCH_CARD_VALUE_TOTAL_HISTORY": {
          return {...state, fetching: true}
      }
      case "FETCH_CARD_VALUE_TOTAL_HISTORY_REJECTED": {
          return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_CARD_VALUE_TOTAL_HISTORY_FULFILLED": {
        return {
            ...state,
            fetching: false,
            fetched: true,
            cardValueTotalHistory: action.payload,
        }
      }
      case "SET_CARD_VALUE_TOTAL_HISTORY": { // wird im Projekt nicht genutzt, könnte aber genutzt werden, wenn die Variable von einer Komponenten und nicht von einem Request gesetzt wird, dann wäre es kein Asynchroner Tast und die Variable würde sofort gesetzt.
        return {
          ...state,
            cardValueTotalHistory: action.payload,
        }
      }
    }

    return state
}