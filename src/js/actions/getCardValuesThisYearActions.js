import config from '../../config/main.config'

export function fetchCardValueThisYear() {  // --> ich mach jetzt in einen Request. Hier könnte man einen Ladebalken anzeigen --> jetzt sind wir ium Zustand fetching
    return {
        type: "FETCH_CARD_VALUE_THIS_YEAR"
    }
}

export function setCardValueThisYear(cardValueThisYear) {
    return {
        type: "FETCH_CARD_VALUE_THIS_YEAR_FULFILLED",   // die Angabe des Type ist zwingend! --> Der Reducer braucht diese, damit er weiß, auf was er reagieren muss
        payload: {   // JSON                    // jetzt ist der Request fertig --> nun wird der Reducer informiert und reagiert darauf
            cardValueThisYear: cardValueThisYear            // Die Daten - hier payload genannt - können auch anders benannt werden.
        }
    }
}

export function cardValueThisYearRejected(error) {
    return {
        type: "FETCH_CARD_VALUE_THIS_YEAR_REJECTED",
        payload: error
    }
}

export function cardValueThisYearSync(cardValueThisYear) {
    return {
        type: "SET_CARD_VALUE_THIS_YEAR",
        payload: {
            cardValueThisYear: cardValueThisYear
        }
    }
}

// Actions werden nacheinander getriggert
export function fetchValueThisYear() {
    return (dispatch) => {
        dispatch(fetchCardValueThisYear());
        return fetch('http://localhost:3001/carddata/alllasttransactionsthisyear', {
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
                        dispatch(setCardValueThisYear(json));
                    });

                } else {
                    response.json().then(json => {
                        dispatch(cardValueThisYearRejected('Error on fetching'));
                        throw error;
                    });
                }
            })
            .catch(
                error => {
                    error.json().then(json => {
                        dispatch(cardValueThisYearRejected('Error on fetching'));
                        throw error;
                    });
                }
            );
    };
}