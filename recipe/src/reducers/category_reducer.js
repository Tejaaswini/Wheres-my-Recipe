import _ from 'lodash';

import { FETCH_CATEGORY, FETCH_CATEGORY_RECIPES, UNAUTHENTICATED } from '../constants';

export default (state = {}, action) => {
    switch(action.type) {
        case "FETCHING":
            return null
        case FETCH_CATEGORY:
            return { ...state, category_item: action.payload.data.recipe_category};
        case FETCH_CATEGORY_RECIPES:
            return  { 
                ...state, 
                category_recipes: _.mapKeys(action.payload.data.recipes_in_category, "id"),
                recipePagination: action.payload.data
            }
        case UNAUTHENTICATED:
            return {  ...state,  category: {} };
        default:
            return state
    }
}