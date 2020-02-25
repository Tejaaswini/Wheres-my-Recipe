import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import {mount, shallow} from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import { Collapse, Navbar, Nav, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import NavbarComponent from '../../../components/universal/navbar';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Navbar after authentication', () => {
    let store, wrapper;
    let state = {
        form: {},
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
        const div = document.createElement('div');
        ReactDOM.render(
            <Provider store={store}>
                <Router>
                    <NavbarComponent />
                </Router>
            </Provider>, div
        );
    });

    it('it has valid snapshot', () => {
        const component = renderer.create(
            <Provider store={store}>
                <Router>
                    <NavbarComponent />
                </Router>
            </Provider>
        );
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('it renders children when passed in', () => {
        const wrapper = shallow((
            <Provider store={store}>
                <Router>
                    <NavbarComponent>
                        <Navbar color="dark" dark expand = "md" />
                    </NavbarComponent>
                </Router>
            </Provider>
        ));
        expect(wrapper.contains(<Navbar color="dark" dark expand = "md" />)).toEqual(true);
    });

    it('it renders YUMMY RECIPES APP brand', () => {
        const wrapper = mount((
            <Provider store={store}>
                <Router>
                    <NavbarComponent />
                </Router>
            </Provider>
        ));
        const brand = <NavbarBrand href="/">
                            <li className="fa fa-home fa-fw" aria-hidden="true"></li> YUMMY RECIPES APP
                        </NavbarBrand>;
        expect(wrapper.contains(brand)).toEqual(true);
    });

    it('it renders three <NavItem /> component elements when authenticated', () => {
        const wrapper = mount((
            <Provider store={store}>
                <Router>
                    <NavbarComponent />
                </Router>
            </Provider>
        ));
        expect(wrapper.find(NavItem)).toHaveLength(3);
    });

    it('it renders three <NavLink /> component elements when authenticated', () => {
        const wrapper = mount((
            <Provider store={store}>
                <Router>
                    <NavbarComponent />
                </Router>
            </Provider>
        ));
        expect(wrapper.find(NavLink)).toHaveLength(3);
    });
});

describe('Navbar before authentication', () => {
    let store, wrapper;
    let state = {
        form: {},
        auth: {
            authenticated: false
        },
        categories: {},
        category: {},
        recipes: {},
        recipe: {},
    };

    beforeEach(() => {
        store = mockStore(state);
    });

    it('it renders two <NavItem /> component elements when not authenticated', () => {
        const wrapper = mount((
            <Provider store={store}>
                <Router>
                    <NavbarComponent />
                </Router>
            </Provider>
        ));
        expect(wrapper.find(NavItem)).toHaveLength(2);
    });

    it('it renders two <NavLink /> component elements when not authenticated', () => {
        const wrapper = mount((
            <Provider store={store}>
                <Router>
                    <NavbarComponent />
                </Router>
            </Provider>
        ));
        expect(wrapper.find(NavLink)).toHaveLength(2);
    });
});