'use strict';

// Actions
import * as Actions from "../actions/actions";

// Immutable
const {Map} = require('immutable');

// State
const initialState = Map({
    items: [],
    loaded: false,
    current: null
});

// Reducers
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case Actions.REQUEST_START:
            return state.setIn(['loaded'], false)
                .setIn(['current'], null);
        case Actions.REQUEST_SUCCESS:
            return state.setIn(['loaded'], true)
                .setIn(['items'], action.items)
                .setIn(['current'], null);
        case Actions.SHOW_COUNTRY:
            return state.setIn(['current'], action.current);
    }
    return state;
}
