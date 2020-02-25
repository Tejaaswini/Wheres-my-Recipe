import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import promise from 'redux-promise';
import reduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import authReducer from './auth_reducer';
import categoriesReducer from './categories_reducer';
import categoryReducer from './category_reducer';
import recipesReducer from './recipes_reducer';
import recipeReducer from './recipe_reducer';
import loaderReducer from './loader_reducer';

/* reducers for the entire project */
const rootReducer = combineReducers({
    form: formReducer,
    auth: authReducer,
    categories: categoriesReducer,
    category: categoryReducer,
    recipes: recipesReducer,
    recipe: recipeReducer,
    loader: loaderReducer,
});

const createStoreWithMiddleware = applyMiddleware(promise, reduxThunk,logger)(createStore);
const store = createStoreWithMiddleware(
    rootReducer, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


export default store;