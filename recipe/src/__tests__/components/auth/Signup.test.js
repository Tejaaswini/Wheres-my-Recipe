import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from 'redux-mock-store';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import {mount, shallow} from 'enzyme';
import { Field, reduxForm } from 'redux-form';
import renderer from 'react-test-renderer';
import { BrowserRouter as Router } from 'react-router-dom';
import { Button, Form, FormGroup, FormFeedback, Label, Input } from 'reactstrap';
import CarouselComponent from '../../../components/universal/carousel';
import Signup from '../../../components/auth/signup';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Signup', () => {
    let store, wrapper;
    let initialState = {
        auth: {
            authenticated: false
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
                    <Signup />
                </Router>
            </Provider>, div
        );
    });

    it('it has valid snapshot', () => {
        const component = renderer.create(
            <Provider store={store}>
                <Router>
                    <Signup />
                </Router>
            </Provider>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('it renders <CarouselComponent /> component', () => {
        const wrapper = mount((
            <Provider store={store}>
                <Router>
                    <Signup />
                </Router>
            </Provider>
        ));
        expect(wrapper.find(CarouselComponent)).toHaveLength(1);
    });

    it('it renders <CarouselComponent /> component', () => {
        const wrapper = mount((
            <Provider store={store}>
                <Router>
                    <Signup />
                </Router>
            </Provider>
        ));
        expect(wrapper.find(CarouselComponent)).toHaveLength(1);
    });

    it('it renders four <Field /> component', () => {
        const wrapper = mount((
            <Provider store={store}>
                <Router>
                    <Signup />
                </Router>
            </Provider>
        ));
        expect(wrapper.contains(Field)).toEqual(true);
        expect(wrapper.find(Field)).toHaveLength(4);
    });
});