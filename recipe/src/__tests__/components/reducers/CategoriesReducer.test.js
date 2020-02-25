import categoriesReducer from '../../../reducers/categories_reducer';
import { FETCH_CATEGORIES, UNAUTHENTICATED } from '../../../constants';

describe('Categories Reducer', () => {
    it('should return categories when passed in FETCH_CATEGORIES', () => {
        const initialState = [{}];

        const action = {
            type: FETCH_CATEGORIES,
            payload: {
                data: {
                    current_page: 1,
                    next_page: "",
                    pages: 1,
                    per_page: "",
                    previous_page: 2,
                    status: "success",
                    total_count: 2,
                    recipe_categories: [
                        {
                            id: 1,
                            name: "Lunch",
                            description: "Awesome lunch"
                        },
                        {
                            id: 2,
                            name: "Dinner",
                            description: "Awesome dinner"
                        }
                    ]
                }
            }
        }

        const expected = {
            "0": {},
            categories: {
                "1": {id: 1, name: "Lunch", description: "Awesome lunch"},
                "2": {id: 2, name: "Dinner", description: "Awesome dinner"}
            },
            categoryPagination: action.payload.data
        }

        const newState = categoriesReducer(initialState, action);
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
            categories: {}
        }

        const newState = categoriesReducer(initialState, action);
        expect(newState).toEqual(expected);
    });

    it('should return default state when passed no action', () => {
        const initialState = [{}];

        const action = {};
        const expected = [{}];

        const newState = categoriesReducer(initialState, action);
        expect(newState).toEqual(expected);
    });

    it('should return null state when passed fetching', () => {
        const initialState = [{}];

        const action = {
            type: "FETCHING"
        };
        const expected = null;

        const newState = categoriesReducer(initialState, action);
        expect(newState).toEqual(expected);
    });
});