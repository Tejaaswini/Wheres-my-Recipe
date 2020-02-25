import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from 'redux-mock-store';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import {mount, shallow} from 'enzyme';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import Signin from '../../../components/auth/signin';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Signin', () => {
    let store, wrapper;
    let initialState = {
        auth: {
            authenticated: false
        },
        loader: {
            isLoading: false
        },
        form: {},
        categories: {},
        category: {},
        recipes: {},
        recipe: {},
    };

    beforeEach(() => {
        store = mockStore(initialState);
    });

    it('it renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <Provider store={store}>
                <Router>
                    <Signin />
                </Router>
            </Provider>, div
        );
    });

    it('it has valid snapshot', () => {
        const component = renderer.create(
            <Provider store={store}>
                <Router>
                    <Signin />
                </Router>
            </Provider>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});