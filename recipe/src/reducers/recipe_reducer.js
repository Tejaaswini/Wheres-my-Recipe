import _ from 'lodash';

import { FETCH_RECIPE, DELETE_RECIPE, UNAUTHENTICATED } from '../constants';

export default (state = {}, action) => {
    switch(action.type) {
        case "FETCHING":
            return null
        case DELETE_RECIPE:
            return _.omit(state, action.payload)  // returns new state object with particular recipe present
        case FETCH_RECIPE:
            return { ...state, recipe_item: action.payload.data.recipe};
        case UNAUTHENTICATED:
            return {  ...state,  recipe: {} };
        default:
            return state
    }
}