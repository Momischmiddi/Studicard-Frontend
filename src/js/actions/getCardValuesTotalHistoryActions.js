import config from '../../config/main.config'

export function fetchCardValueTotalHistory() {  // --> ich mach jetzt in einen Request. Hier könnte man einen Ladebalken anzeigen --> jetzt sind wir ium Zustand fetching
    return {
        type: "FETCH_CARD_VALUE_TOTAL_HISTORY"
    }
}

export function setCardValueTotalHistory(cardValueTotalHistory) {
    return {
        type: "FETCH_CARD_VALUE_TOTAL_HISTORY_FULFILLED",   // die Angabe des Type ist zwingend! --> Der Reducer braucht diese, damit er weiß, auf was er reagieren muss
        payload: {   // JSON                    // jetzt ist der Request fertig --> nun wird der Reducer informiert und reagiert darauf
            cardValueTotalHistory: cardValueTotalHistory            // Die Daten - hier payload genannt - können auch anders benannt werden.
        }
    }
}

export function cardValueTotalHistoryRejected(error) {
    return {
        type: "FETCH_CARD_VALUE_TOTAL_HISTORY_REJECTED",
        payload: error
    }
}

export function cardValueTotalHistorySync(cardValueTotalHistory) {
    return {
        type: "SET_CARD_VALUE_TOTAL_HISTORY",
        payload: {
            cardValueTotalHistory: cardValueTotalHistory
        }
    }
}

export function fetchTotalHistory() {
    return (dispatch) => {
        dispatch(fetchCardValueTotalHistory());
        return fetch('http://localhost:3001/carddata/totalhistory', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        })
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    response.json().then(json => {
                        dispatch(setCardValueTotalHistory(json));
                    });

                } else {
                    response.json().then(json => {
                        dispatch(cardValueTotalHistoryRejected('Error on fetching'));
                        throw error;
                    });
                }
            })
            .catch(
                error => {
                    error.json().then(json => {
                        dispatch(cardValueTotalHistoryRejected('Error on fetching'));
                        throw error;
                    });
                }
            );
    };
}