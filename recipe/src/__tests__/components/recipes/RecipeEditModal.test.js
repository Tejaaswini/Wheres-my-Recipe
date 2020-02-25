import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import reduxThunk from 'redux-thunk';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import { Link } from 'react-router-dom';
import {configure, mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import { BrowserRouter as Router } from 'react-router-dom';
import RecipeEditModal from '../../../components/recipes/recipe_edit_modal';

const middlewares = [reduxThunk];
const mockStore = configureStore(middlewares);

configure({adapter: new Adapter()});

describe('Recipes Editing', () => {
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

    const props = {
        recipe: {
            id: 1,
            name: "Salads",
            description: "Sweat salads",
            ingredients: "Mangoes, Oranges",
            directions: "Cut and mix"
        } 
    }

    beforeEach(() => {
        store = mockStore(state);
    });

    it('it renders without crashing', () => {
        shallow(
            <Provider store={store}>
                <Router>
                    <RecipeEditModal { ...props } />
                </Router>
            </Provider>
        );
    });

    // it('it has valid snapshot', () => {
    //     const component = renderer.create(
    //         <Provider store={store}>
    //             <Router>
    //                 <RecipeEditModal { ...props } />
    //             </Router>
    //         </Provider>
    //     );
    //     const tree = component.toJSON();
    //     expect(tree).toMatchSnapshot();
    // });

});