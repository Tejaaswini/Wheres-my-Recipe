import recipeReducer from '../../../reducers/recipe_reducer';
import { FETCH_RECIPE, DELETE_RECIPE, UNAUTHENTICATED } from '../../../constants';

describe('Recipe Reducer', () => {
    it('should return category when passed in FETCH_RECIPE', () => {
        const initialState = [{}];

        const action = {
            type: FETCH_RECIPE,
            payload: {
                data: {
                    recipe: [
                        {
                            id: 1,
                            name: "Lunch recipe",
                            description: "Awesome lunch",
                            "ingredients": "Onions, Tomatoes",
                            "directions": "Cook lunch with onions and tomatoes"
                        }
                    ]
                }
            }
        }

        const expected = {
            "0": {},
            recipe_item: [{
                id: 1,
                name: "Lunch recipe",
                description: "Awesome lunch",
                "ingredients": "Onions, Tomatoes",
                "directions": "Cook lunch with onions and tomatoes"
            }]
        }

        const newState = recipeReducer(initialState, action);
        expect(newState).toEqual(expected);
    });

    it('should return state when one recipe is omitted when passed in DELETE_RECIPE', () => {
        const initialState = [{}];

        const action = {
            type:  DELETE_RECIPE,
            payload: {
                data: {
                    "recipes_in_category": [
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
            "0": {}
        }

        const newState = recipeReducer(initialState, action);
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
            recipe: {}
        }

        const newState = recipeReducer(initialState, action);
        expect(newState).toEqual(expected);
    });

    it('should return default state when passed no action', () => {
        const initialState = [{}];

        const action = {};
        const expected = [{}];

        const newState = recipeReducer(initialState, action);
        expect(newState).toEqual(expected);
    });

    it('should return null state when passed fetching', () => {
        const initialState = [{}];

        const action = {
            type: "FETCHING"
        };
        const expected = null;

        const newState = recipeReducer(initialState, action);
        expect(newState).toEqual(expected);
    });
});