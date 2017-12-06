import config from '../../config/main.config'

export function fetchCardValue() {  // --> ich mach jetzt in einen Request. Hier könnte man einen Ladebalken anzeigen --> jetzt sind wir ium Zustand fetching
    return {
        type: "FETCH_CARD_VALUE"
    }
}

export function setCardValue(cardValue) {
    return {
        type: "FETCH_CARD_VALUE_FULFILLED",   // die Angabe des Type ist zwingend! --> Der Reducer braucht diese, damit er weiß, auf was er reagieren muss
        payload: {   // JSON                    // jetzt ist der Request fertig --> nun wird der Reducer informiert und reagiert darauf
            cardValue: cardValue            // Die Daten - hier payload genannt - können auch anders benannt werden.
        }
    }
}

export function cardValueRejected(error) {
    return {
        type: "FETCH_CARD_VALUE_REJECTED",
        payload: error
    }
}

export function cardValueSync(cardValue) {
    return {
        type: "SET_CARD_VALUE",
        payload: {
            cardValue: cardValue
        }
    }
}

// Actions werden nacheinander getriggert
export function fetchValue() {
    return (dispatch) => {
        dispatch(fetchCardValue());
        return fetch('http://localhost:3001/carddata/cardvalue', {
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
                        dispatch(setCardValue(json));
                    });

                } else {
                    response.json().then(json => {
                        dispatch(cardValueRejected('Error on fetching'));
                        throw error;
                    });
                }
            })
            .catch(
                error => {
                    error.json().then(json => {
                        dispatch(cardValueRejected('Error on fetching'));
                        throw error;
                    });
                }
            );
    };
}