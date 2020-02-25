import loaderReducer from '../../../reducers/loader_reducer';
import { IS_LOADING, NOT_LOADING  } from '../../../constants';

describe('Loader Reducer', () => {
    it('should return isloading to true when passed in IS_LOADING', () => {
        const initialState = [{isLoading: false}];

        const action = {
            type: IS_LOADING,
        };
        const expected = {
            "0": {isLoading: false},
            isLoading: true, 
        };
        
        const newState = loaderReducer(initialState, action);
        expect(newState).toEqual(expected);
    });

    it('should return isloading to false when passed in NOT_LOADING', () => {
        const initialState = [{isLoading: false}];

        const action = {
            type: NOT_LOADING,
        };
        const expected = {
            "0": {isLoading: false},
            isLoading: false, 
        };
        
        const newState = loaderReducer(initialState, action);
        expect(newState).toEqual(expected);
    });

    it('should return initial state when passed no action', () => {
        const initialState = [{isLoading: false}];

        const action = {};
        const expected = initialState;
        
        const newState = loaderReducer(initialState, action);
        expect(newState).toEqual(expected);
    });
});
