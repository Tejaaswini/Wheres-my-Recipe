import categoryReducer from '../../../reducers/category_reducer';
import { FETCH_CATEGORY, FETCH_CATEGORY_RECIPES, UNAUTHENTICATED, FETCH_CATEGORIES } from '../../../constants';

describe('Category Reducer', () => {
    it('should return category when passed in FETCH_CATEGORY', () => {
        const initialState = [{}];

        const action = {
            type: FETCH_CATEGORY,
            payload: {
                data: {
                    recipe_category: [
                        {
                            id: 1,
                            name: "Lunch",
                            description: "Awesome lunch"
                        }
                    ]
                }
            }
        }

        const expected = {
            "0": {},
            category_item: [{
                id: 1, name: "Lunch", description: "Awesome lunch"
            }]
        }

        const newState = categoryReducer(initialState, action);
        expect(newState).toEqual(expected);
    });

    it('should return category recipes when passed FETCH_CATEGORY_RECIPES', () => {
        const initialState = [{}];

        const action = {
            type:  FETCH_CATEGORY_RECIPES,
            payload: {
                data: {
                    current_page: 1,
                    next_page: "",
                    pages: 1,
                    per_page: "",
                    previous_page: 2,
                    status: "success",
                    total_count: 2,
                    recipes_in_category: [
                        {
                            id: 1,
                            name: "Lunch recipe",
                            description: "Awesome lunch",
                            "ingredients": "Onions, Tomatoes",
                            "directions": "Cook lunch with onions and tomatoes"
                        },
                        {
                            id: 2,
                            name: "Dinner recipe",
                            description: "Awesome dinner",
                            "ingredients": "Onions, Tomatoes",
                            "directions": "Cook dinner with onions and tomatoes"
                        }
                    ]
                }
            }
        }

        const expected = {
            "0": {},
            category_recipes: {
                "1": {
                    id: 1, name: "Lunch recipe", description: "Awesome lunch", 
                    "ingredients": "Onions, Tomatoes",
                    "directions": "Cook lunch with onions and tomatoes"
                },
                "2": {
                    id: 2, name: "Dinner recipe", description: "Awesome dinner",
                    "ingredients": "Onions, Tomatoes",
                    "directions": "Cook dinner with onions and tomatoes"
                }
            },
            recipePagination: action.payload.data
        }

        const newState = categoryReducer(initialState, action);
        expect(newState).toEqual(expected);
    });

    it('should return empty category state when passed in UNAUTHENTICATED', () => {
        const initialState = [{}];

        const action = {
            type: UNAUTHENTICATED,
            payload: "Invalid authentication credentials"
        }
        
        const expected = {
            "0": {},
            category: {}
        }

        const newState = categoryReducer(initialState, action);
        expect(newState).toEqual(expected);
    });

    it('should return default state when passed no action', () => {
        const initialState = [{}];

        const action = {};
        const expected = [{}];

        const newState = categoryReducer(initialState, action);
        expect(newState).toEqual(expected);
    });

    it('should return null state when passed fetching', () => {
        const initialState = [{}];

        const action = {
            type: "FETCHING"
        };
        const expected = null;

        const newState = categoryReducer(initialState, action);
        expect(newState).toEqual(expected);
    });
});