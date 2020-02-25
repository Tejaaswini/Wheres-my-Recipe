import { IS_LOADING, NOT_LOADING } from '../constants';

export const initialState = {
    isLoading: false
};

export default (state = initialState, action) => {
    switch(action.type) {
        case IS_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case NOT_LOADING:
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
}