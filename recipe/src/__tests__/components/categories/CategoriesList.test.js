import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from 'redux-mock-store';
import reduxThunk from 'redux-thunk';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import { Link } from 'react-router-dom';
import {configure, mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import { BrowserRouter as Router } from 'react-router-dom';
import { CategoriesList } from '../../../components/catogories/category_list';
import mockData from '../../../__mocks__/mockData';
import mockLocalStorage from '../../../__mocks__/mockLocalStorage';

const middlewares = [reduxThunk];
const mockStore = configureStore(middlewares);
const { authResponse } = mockData;
// window.localStorage = mockLocalStorage;
localStorage.setItem('current_user', authResponse.data.auth_token);

describe('Category List', () => {
    const { categories } = mockData;
    let store, wrapper;
    let state = {
        auth: {
            authenticated: true
        },
        categories: categories,
        category: {},
        recipes: {},
        recipe: {},
    };

    const props = {
        categories: state.categories,
        fetchCategories: () => Promise.resolve()
    }

    beforeEach(() => {
        store = mockStore(state);
    });
    it('it renders without crashing', () => {
        mount(
            <Provider store={store}>
                <Router>
                    <CategoriesList { ...props } />
                </Router>
            </Provider>
        );
    });
});