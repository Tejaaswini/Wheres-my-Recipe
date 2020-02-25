import moxios from 'moxios';
import jwt from 'jsonwebtoken';
import reduxThunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { spy } from 'sinon';
import mockData from '../../../__mocks__/mockData';
import mockLocalStorage from '../../../__mocks__/mockLocalStorage';
import { signInAction, signUpAction, signOutAction } from '../../../actions/index';
import { ROOT_URL, REGISTER, AUTHENTICATED, UNAUTHENTICATED, AUTHENTICATED_ERROR } from '../../../constants';
import { instance } from '../../../actions/AxiosInstance';

const middlewares = [reduxThunk];
const mockStore = configureStore(middlewares);

describe('Auth Actions', () => {
    let originalTimeout;
    beforeEach(() => { 
        moxios.install(instance)
    });
    afterEach(() => { 
        moxios.uninstall(instance) 
        // moxios.uninstall() 
    });

    it('creates AUTHENTICATED when signin action is successful', async (done) => {
        const { signInData, authResponse } = mockData;

        const payload = authResponse.data;
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
              status: 201,
              response: payload,
            });
            done();
        });
        const expectedActions = [
            { 
                type: AUTHENTICATED, 
                user: jwt.decode(authResponse.data.auth_token),
            }
        ]

        const store = mockStore({});
        return store.dispatch(signInAction(signInData, history)).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('creates REGISTER when signup action is successful', async (done) => {
        const { signUpData, regResponse } = mockData;

        const payload = regResponse;
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
              status: 201,
              response: payload,
            });
            done();
        });
        const expectedActions = [
            { 
                type: REGISTER, 
                payload: payload,
            }
        ]

        const store = mockStore({});
        return store.dispatch(signUpAction(signUpData, ()=>{})).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    
    
});