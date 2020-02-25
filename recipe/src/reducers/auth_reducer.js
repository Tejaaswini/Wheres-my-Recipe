import { AUTHENTICATED, UNAUTHENTICATED, AUTHENTICATED_ERROR } from '../constants';

export default (state={}, action) => {
    switch(action.type) {
        case AUTHENTICATED:
            return { ...state, authenticated: true, user: action.user };
        case UNAUTHENTICATED:
            return {  ...state,  authenticated: false, user: {} };
        case AUTHENTICATED_ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
}