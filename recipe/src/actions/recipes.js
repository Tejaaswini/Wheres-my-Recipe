import instance from './AxiosInstance';
import { notify } from 'react-notify-toast';
import { 
    ROOT_URL, CREATE_RECIPE, FETCH_RECIPES, FETCH_RECIPE, FETCH_CATEGORY_RECIPES, DELETE_RECIPE, EDIT_RECIPE 
} from '../constants';

export const createRecipe = (values, cat_id, callback) => {
    return async (dispatch) => {
        const request = await instance.post(`${ROOT_URL}/recipe_category/${cat_id}/recipes`, values)
        .then((response) => {
            dispatch({
                type: CREATE_RECIPE,
                payload: response
            });
            callback();
            notify.show(response.data.message, 'success', 5000);
        })
        .catch((error) => {
            dispatch({
                type: "UNAUTHENTICATED",
                payload: "Invalid authentication credentials"
            });
            notify.show(error.response.data.message, 'error', 5000);
        });
    }
    
}

export const fetching = () => {
    return {
        type: "FETCHING"
    }
}

export const fetchRec = (res) => {
    return {
        type: FETCH_RECIPES,
        payload: res,
    }
}

// action creator for fetching recipes from the database
export const fetchRecipes = (value, page) => {
    return async (dispatch) => {
        
        dispatch(fetching);
        if(value){
            const limit = 4;
            let request = await instance.get(`${ROOT_URL}/search_recipes?q=${value}&limit=${limit}`)
            .then((response) => {
                dispatch(fetchRec(response));
            })
            .catch((error) => {
                dispatch({
                    type: "UNAUTHENTICATED",
                    payload: "Invalid authentication credentials"
                });
                localStorage.removeItem('current_user');
                notify.show(error.response.data.message, 'error', 5000);
            });
            if(page){
                request = await instance.get(`${ROOT_URL}/recipes?q=${value}&limit=${limit}&page=${page}`)
                .then((response) => {
                    dispatch(fetchRec(response));
                })
                .catch((error) => {
                    dispatch({
                        type: "UNAUTHENTICATED",
                        payload: "Invalid authentication credentials"
                    });
                    localStorage.removeItem('current_user');
                    notify.show(error.response.data.message, 'error', 5000);
                });
            }
        }else{
            const limit = 4;
            let request = await instance.get(`${ROOT_URL}/recipes?limit=${limit}`)
            .then((response) => {
                dispatch(fetchRec(response));
            })
            .catch((error) => {
                dispatch({
                    type: "UNAUTHENTICATED",
                    payload: "Invalid authentication credentials"
                });
                localStorage.removeItem('current_user');
                notify.show(error.response.data.message, 'error', 5000);
            });
            if(page){
                request = await instance.get(`${ROOT_URL}/recipes?limit=${limit}&page=${page}`)
                .then((response) => {
                    dispatch(fetchRec(response));
                })
                .catch((error) => {
                    dispatch({
                        type: "UNAUTHENTICATED",
                        payload: "Invalid authentication credentials"
                    });
                    localStorage.removeItem('current_user');
                    notify.show(error.response.data.message, 'error', 5000);
                });;
            }
        }
    }
}

// action creator for fetching recipes in category from the database
export const fetchCategoryRecipes = (id, page) => {
    return async (dispatch) => {
        try {
            dispatch(fetching);
            if(page){
                const limit = 4;
                const request = await instance.get(`${ROOT_URL}/recipe_category/${id}/recipes?limit=${limit}&page=${page}`);
                dispatch({
                    type: FETCH_CATEGORY_RECIPES,
                    payload: request,
                });
            }else{
                const limit = 4;
                const request = await instance.get(`${ROOT_URL}/recipe_category/${id}/recipes?limit=${limit}`);
                dispatch({
                    type: FETCH_CATEGORY_RECIPES,
                    payload: request,
                });
            }
        }catch(error) {
            dispatch({
                type: "UNAUTHENTICATED",
                payload: "Invalid authentication credentials"
            });
            localStorage.removeItem('current_user');
            notify.show(error.response.data.message, 'error', 5000);
        }
    }
}

// action creator for fetching single recipe
export const fetchRecipe = (cat_id, recipe_id) =>{
    return async (dispatch) => {
        const request = await instance.get(`${ROOT_URL}/recipe_category/${cat_id}/recipes/${recipe_id}`)
        .then((response) => {
            dispatch({
                type: FETCH_RECIPE,
                payload: response
            })
        })
        .catch((error) => {
            dispatch({
                type: "UNAUTHENTICATED",
                payload: "Invalid or expired token please login again"
            })
            localStorage.removeItem('current_user');
            notify.show(error.response.data.message, 'error', 5000);
        });
    }

}

// action creator for delete recipe
export const deleteRecipe = (cat_id, recipe_id, callback) => {
    return async (dispatch) => {
        const request = await instance.delete(`${ROOT_URL}/recipe_category/${cat_id}/recipes/${recipe_id}`)
        .then((response) => {
            dispatch({
                type: DELETE_RECIPE,
                payload: request
            });
            callback();
            notify.show(response.data.message, 'success', 5000);
        })
        .catch((error) => {
            dispatch({
                type: "UNAUTHENTICATED",
                payload: "Invalid or expired token please login again"
            })
            notify.show(error.response.data.message, 'error', 5000);
        });
    }
}

// action creator for delete recipe
export const editRecipe = (values, cat_id, recipe_id, callback) => {
    return async (dispatch) => {
        const request = await instance.put(`${ROOT_URL}/recipe_category/${cat_id}/recipes/${recipe_id}`, values)
        .then((response) => {
            dispatch({
                type: EDIT_RECIPE,
                payload: request
            });
            notify.show(response.data.message, 'success', 5000);
            callback()
        })
        .catch((error) => {
            dispatch({
                type: "UNAUTHENTICATED",
                payload: "Invalid or expired token please login again"
            })
            notify.show(error.response.data.message, 'error', 5000);
        });
    }
}