import authReducer from '../../../reducers/auth_reducer';
import { AUTHENTICATED, UNAUTHENTICATED, AUTHENTICATED_ERROR } from '../../../constants';

describe('Auth Reducer', () => {
    it('should authenticate user when passed in AUTHENTICATED', () => {
        const initialState = [{}];

        const action = {
            type: AUTHENTICATED,
            user: '!$@$#%#^#^#&#**#*#*@@*(@@(()@)@)ISHUHSUNZXBNJXNBJCBNJ'
        };
        const expected = {
            "0": {},
            authenticated: true, 
            user: action.user,
        };
        
        const newState = authReducer(initialState, action);
        expect(newState).toEqual(expected);
    });

    it('should logout user when passed in UNAUTHENTICATED', () => {
        const initialState = [{}];

        const action = {
            type: UNAUTHENTICATED,
        };
        const expected = {
            "0": {},
            authenticated: false, 
            user: {},
        };
        
        const newState = authReducer(initialState, action);
        expect(newState).toEqual(expected);
    });

    it('should return error message in AUTHENTICATED_ERROR', () => {
        const initialState = [{}];

        const action = {
            type: AUTHENTICATED_ERROR,
            payload: 'Invalid email or password',
        };
        const expected = {
            "0": {},
            error: action.payload
        };
        
        const newState = authReducer(initialState, action);
        expect(newState).toEqual(expected);
    });

    it('should return empty state when passed no action', () => {
        const initialState = [{}];

        const action = {};
        const expected = [{}];
        
        const newState = authReducer(initialState, action);
        expect(newState).toEqual(expected);
    });
});
