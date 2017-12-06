import config from '../../config/main.config'

export function fetchScanDetails() {  // --> ich mach jetzt in einen Request. Hier könnte man einen Ladebalken anzeigen --> jetzt sind wir ium Zustand fetching
    return {
        type: "FETCH_SCAN_DETAILS"
    }
}

export function setScanDetails(scanDetails) {
    return {
        type: "FETCH_SCAN_DETAILS_FULFILLED",   // die Angabe des Type ist zwingend! --> Der Reducer braucht diese, damit er weiß, auf was er reagieren muss
        payload: {   // JSON                    // jetzt ist der Request fertig --> nun wird der Reducer informiert und reagiert darauf
            scanDetails: scanDetails            // Die Daten - hier payload genannt - können auch anders benannt werden.
        }
    }
}

export function scanDetailsRejected(error) {
    return {
        type: "FETCH_SCAN_DETAILS_REJECTED",
        payload: error
    }
}

export function scanDetailsSync(scanDetails) {
    return {
        type: "SET_SCAN_DETAILS",
        payload: {
            scanDetails: scanDetails
        }
    }
}

export function fetchDetails(date) {
    return (dispatch) => {
        dispatch(fetchScanDetails());
        return fetch('http://localhost:3001/carddata/getscandetails/?date=' + date, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        })
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    response.json().then(json => {
                        dispatch(setScanDetails(json));
                    });

                } else {
                    response.json().then(json => {
                        dispatch(scanDetailsRejected('Error on fetching'));
                        throw error;
                    });
                }
            })
            .catch(
                error => {
                    error.json().then(json => {
                        dispatch(scanDetailsRejected('Error on fetching'));
                        throw error;
                    });
                }
            );
    };
}