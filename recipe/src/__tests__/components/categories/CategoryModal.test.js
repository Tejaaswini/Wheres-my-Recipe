import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from 'redux-mock-store';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import { Link } from 'react-router-dom';
import {configure, mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import { BrowserRouter as Router } from 'react-router-dom';
import CategoryModal from '../../../components/catogories/category_modal';

const middlewares = [];
const mockStore = configureStore(middlewares);

configure({adapter: new Adapter()});

describe('Category Modal', () => {
    let store, wrapper;
    let state = {
        auth: {
            authenticated: true
        },
        categories: {},
        category: {},
        recipes: {},
        recipe: {},
    };

    beforeEach(() => {
        store = mockStore(state);
    });
    
    it('it renders without crashing', () => {
        shallow(
            <Provider store={store}>
                <Router>
                    <CategoryModal />
                </Router>
            </Provider>
        );
    });
});