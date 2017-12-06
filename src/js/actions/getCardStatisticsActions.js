import config from '../../config/main.config'

export function fetchCardStatistics() {  // --> ich mach jetzt in einen Request. Hier könnte man einen Ladebalken anzeigen --> jetzt sind wir ium Zustand fetching
    return {
        type: "FETCH_CARD_STATISTICS"
    }
}

export function setCardStatistics(cardStatistics) {
    return {
        type: "FETCH_CARD_STATISTICS_FULFILLED",   // die Angabe des Type ist zwingend! --> Der Reducer braucht diese, damit er weiß, auf was er reagieren muss
        payload: {   // JSON                    // jetzt ist der Request fertig --> nun wird der Reducer informiert und reagiert darauf
            cardStatistics: cardStatistics            // Die Daten - hier payload genannt - können auch anders benannt werden.
        }
    }
}

export function cardStatisticsRejected(error) {
    return {
        type: "FETCH_CARD_STATISTICS_REJECTED",
        payload: error
    }
}

export function cardStatisticsSync(cardStatistics) {
    return {
        type: "SET_CARD_STATISTICS",
        payload: {
            cardStatistics: cardStatistics
        }
    }
}

// Actions werden nacheinander getriggert
export function fetchStatistics() {
    console.log('Requesting Statistics..');
    return (dispatch) => {
        dispatch(fetchCardStatistics());
        // return fetch(config.BASE_URL + '/carddata/statistics', {
        return fetch('http://localhost:3001/carddata/statistics', {
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
                        dispatch(setCardStatistics(json));
                    });

                } else {
                    response.json().then(json => {
                        dispatch(cardStatisticsRejected('Error on fetching'));
                        throw error;
                    });
                }
            })
            .catch(
                error => {
                    error.json().then(json => {
                        dispatch(cardStatisticsRejected('Error on fetching'));
                        throw error;
                    });
                }
            );
    };
}