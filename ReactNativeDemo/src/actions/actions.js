'use strict';

// Action Types
export const REQUEST_START = 'REQUEST_START';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const SHOW_COUNTRY = 'SHOW_COUNTRY';

// Action Creators
function receiveCountries(items) {
    return {
        type: REQUEST_SUCCESS,
        items
    }
}

function startRequest() {
    return {
        type: REQUEST_START
    }
}

async function requestCountries() {
    var response = await fetch('https://restcountries.eu/rest/v1/all');
    return await response.json();
}

export function fetchCountries() {
    return dispatch => {
        dispatch(startRequest());
        return requestCountries()
            .then(items => {
                return dispatch(receiveCountries(items));
            }).catch(err => {
                alert(err);
            });
    }
}