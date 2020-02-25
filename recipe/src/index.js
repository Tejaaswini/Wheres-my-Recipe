import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import jwt from 'jsonwebtoken';

import './style/style.css';
import registerServiceWorker from './registerServiceWorker';
import store from './reducers';

import NavbarComponent from './components/universal/navbar';
import Homepage from './components/homepage';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import Dashboard from './components/universal/dashboard';
import requireAuth from './components/auth/require_auth';
import noRequireAuth from './components/auth/no_require_auth';
import { AUTHENTICATED } from './constants';
import CategoryDetail from './components/catogories/category_detail';
import RecipeDetail from './components/recipes/recipe_detail';

const user = localStorage.getItem('current_user');

if(user) {
    store.dispatch({ type: AUTHENTICATED, user: jwt.decode(user) });
}

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <NavbarComponent />
                <main role="main">
                <Switch>
                    <Route exact path="/" component={Homepage} />
                    <Route exact path="/categories/:id" component={requireAuth(CategoryDetail)} />
                    <Route path="/dashboard" component={requireAuth(Dashboard)} />
                    <Route path="/signup" component={noRequireAuth(Signup)} />
                    <Route path="/signin" component={noRequireAuth(Signin)} />
                    <Route exact path="/categories/:cat_id/recipes/:recipe_id" component={requireAuth(RecipeDetail)} />
                    <Redirect to="/" />
                </Switch>
                {/* footer */}
                <footer className="container">
                    <p>An assignemt for CODEMONK</p>
                    <p className="float-right"><a href="#">Back to Top</a></p>
                </footer>
                </main>
            </div>
        </Router>
    </Provider>, 
    document.querySelector('#root')
);
registerServiceWorker();
