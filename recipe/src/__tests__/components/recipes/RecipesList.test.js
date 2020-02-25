import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from 'redux-mock-store';
import reduxThunk from 'redux-thunk';
import renderer from 'react-test-renderer';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import { Link } from 'react-router-dom';
import {configure, mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import { BrowserRouter as Router } from 'react-router-dom';
import { RecipesList } from '../../../components/recipes/recipe_list';
import mockData from '../../../__mocks__/mockData';

const middlewares = [reduxThunk];
const mockStore = configureStore(middlewares);

configure({adapter: new Adapter()});

describe('RecipesList', () => {
    const { recipes } = mockData;
    let store, wrapper;
    let state = {
        auth: {
            authenticated: true
        },
        categories: {},
        category: {},
        recipes: recipes,
        recipe: {},
    };

    const props = {
        categories: state.recipes,
        fetchRecipes: () => Promise.resolve()
    }

    beforeEach(() => {
        store = mockStore(state);
    });
    it('it renders without crashing', () => {
        mount(
            <Provider store={store}>
                <Router>
                    <RecipesList { ...props } />
                </Router>
            </Provider>
        );
    });

    it('it has valid snapshot', () => {
        const component = renderer.create(
            <Provider store={store}>
                <Router>
                    <RecipesList { ...props } />
                </Router>
            </Provider>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});