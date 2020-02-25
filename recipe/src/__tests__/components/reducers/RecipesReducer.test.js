import recipesReducer from '../../../reducers/recipes_reducer';
import { FETCH_RECIPES, UNAUTHENTICATED } from '../../../constants';

describe('Recipes Reducer', () => {
    it('should return recipes when passed FETCH_RECIPES', () => {
        const initialState = [{}];

        const action = {
            type:  FETCH_RECIPES,
            payload: {
                data: {
                    current_page: 1,
                    next_page: "",
                    pages: 1,
                    per_page: "",
                    previous_page: 2,
                    status: "success",
                    total_count: 2,
                    recipes: [
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
            recipes: {
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

        const newState = recipesReducer(initialState, action);
        expect(newState).toEqual(expected);
    });

    it('should return empty recipes state when passed in UNAUTHENTICATED', () => {
        const initialState = [{}];

        const action = {
            type: UNAUTHENTICATED,
            payload: "Invalid authentication credentials"
        }
        
        const expected = {
            "0": {},
            recipes: {}
        }

        const newState = recipesReducer(initialState, action);
        expect(newState).toEqual(expected);
    });

    it('should return default state when passed no action', () => {
        const initialState = [{}];

        const action = {};
        const expected = [{}];

        const newState = recipesReducer(initialState, action);
        expect(newState).toEqual(expected);
    });

    it('should return null state when passed fetching', () => {
        const initialState = [{}];

        const action = {
            type: "FETCHING"
        };
        const expected = null;

        const newState = recipesReducer(initialState, action);
        expect(newState).toEqual(expected);
    });
});