import _ from 'lodash';

import { FETCH_RECIPES, UNAUTHENTICATED } from '../constants';

export default (state = {}, action) => {
    switch(action.type) {
        case "FETCHING":
            return null
        case FETCH_RECIPES:
            return  {
                ...state,
                recipes: _.mapKeys(action.payload.data.recipes, "id"), // using lodash mapKeys to covert an array to an object
                recipePagination: action.payload.data
            }
        case UNAUTHENTICATED:
            return {  ...state, recipes: {} };
        default:
            return state
    }
}