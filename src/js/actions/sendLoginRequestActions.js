import config from '../../config/main.config'

export function fetchLoginRequest() {  // --> ich mach jetzt in einen Request. Hier könnte man einen Ladebalken anzeigen --> jetzt sind wir ium Zustand fetching
    return {
        type: "FETCH_LOGIN_REQUEST"
    }
}

export function setLoginRequest(loginResponse) {
    return {
        type: "FETCH_LOGIN_REQUEST_FULFILLED",   // die Angabe des Type ist zwingend! --> Der Reducer braucht diese, damit er weiß, auf was er reagieren muss
        payload: {   // JSON                    // jetzt ist der Request fertig --> nun wird der Reducer informiert und reagiert darauf
            loginResponse: loginResponse            // Die Daten - hier payload genannt - können auch anders benannt werden.
        }
    }
}

export function LoginRequestRejected(error) {
    return {
        type: "FETCH_LOGIN_REQUEST_REJECTED",
        payload: error
    }
}

export function LoginRequestSync(loginResponse) {
    return {
        type: "SET_LOGIN_REQUEST",
        payload: {
            loginResponse: loginResponse
        }
    }
}

// Actions werden nacheinander getriggert
export function fetchLogin(cardId) {
    return (dispatch) => {
        dispatch(fetchLoginRequest());
        return fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                username : cardId,
                password : 'none'
            })
        })
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    response.json().then(json => {
                        dispatch(setLoginRequest(json));
                    });

                } else {
                    response.json().then(json => {
                        dispatch(LoginRequestRejected('Error on fetching'));
                        throw error;
                    });
                }
            })
            .catch(
                error => {
                    error.json().then(json => {
                        dispatch(LoginRequestRejected('Error on fetching'));
                        throw error;
                    });
                }
            );
    };
}