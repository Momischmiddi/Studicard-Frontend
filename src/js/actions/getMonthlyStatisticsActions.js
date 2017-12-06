import config from '../../config/main.config'

export function fetchCardValueMonthly() {  // --> ich mach jetzt in einen Request. Hier könnte man einen Ladebalken anzeigen --> jetzt sind wir ium Zustand fetching
    return {
        type: "FETCH_CARD_VALUE_MONTHLY"
    }
}

export function setCardValueMonthly(cardValueMonthly) {
    return {
        type: "FETCH_CARD_VALUE_MONTHLY_FULFILLED",   // die Angabe des Type ist zwingend! --> Der Reducer braucht diese, damit er weiß, auf was er reagieren muss
        payload: {   // JSON                    // jetzt ist der Request fertig --> nun wird der Reducer informiert und reagiert darauf
            cardValueMonthly: cardValueMonthly            // Die Daten - hier payload genannt - können auch anders benannt werden.
        }
    }
}

export function cardValueMonthlyRejected(error) {
    return {
        type: "FETCH_CARD_VALUE_MONTHLY_REJECTED",
        payload: error
    }
}

export function cardValueMonthlySync(cardValueMonthly) {
    return {
        type: "SET_CARD_VALUE_MONTHLY",
        payload: {
            cardValueMonthly: cardValueMonthly
        }
    }
}

export function fetchMonthly(monthIndex) {
    return (dispatch) => {
        dispatch(fetchCardValueMonthly());
        console.log('Hole für den monat: ' , monthIndex);
        return fetch('http://localhost:3001/carddata/monthlystatistics/?month=' + monthIndex, {
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
                        dispatch(setCardValueMonthly(json));
                    });

                } else {
                    response.json().then(json => {
                        dispatch(cardValueMonthlyRejected('Error on fetching'));
                        throw error;
                    });
                }
            })
            .catch(
                error => {
                    error.json().then(json => {
                        dispatch(cardValueMonthlyRejected('Error on fetching'));
                        throw error;
                    });
                }
            );
    };
}