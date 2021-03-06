export default function reducer(state={    // reducer schaut KOmponenten an, die mit ihm verbunden sind (das macht React für uns)
    cardStatistics: null,
    fetching: false,
    fetched: false,
    error: null,
  }, action) {

    switch (action.type) {
      case "FETCH_CARD_STATISTICS": {
          return {...state, fetching: true}
      }
      case "FETCH_CARD_STATISTICS_REJECTED": {
          return {...state, fetching: false, error: action.payload}
      }
      case "FETCH_CARD_STATISTICS_FULFILLED": {
        return {
            ...state,
            fetching: false,
            fetched: true,
            cardStatistics: action.payload,
        }
      }
      case "SET_CARD_STATISTICS": { // wird im Projekt nicht genutzt, könnte aber genutzt werden, wenn die Variable von einer Komponenten und nicht von einem Request gesetzt wird, dann wäre es kein Asynchroner Tast und die Variable würde sofort gesetzt.
        return {
          ...state,
            cardStatistics: action.payload,
        }
      }
    }

    return state
}