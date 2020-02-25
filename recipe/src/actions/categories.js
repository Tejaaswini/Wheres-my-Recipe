import instance from './AxiosInstance';
import { notify } from 'react-notify-toast';
import { ROOT_URL, CREATE_CATEGORY, FETCH_CATEGORIES, FETCH_CATEGORY } from '../constants';


/* action creator for creating new categories 
    takes in form data values and callback method
    executed after submition 
*/
export const createCategory = (values, callback) => {
    return async (dispatch) => {
        const request = instance.post(`${ROOT_URL}/recipe_category`, values)
        .then((response) => {
            dispatch({
                type: CREATE_CATEGORY,
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

export const fetchCat = (res) => {
    return {
        type: FETCH_CATEGORIES,
        payload: res,
    }
}

// action creator for fetching categories from the database
export const fetchCategories = (page) => {
    return async (dispatch) => {
        dispatch(fetching);
        if(page) {
            const limit = 10;
            const request = await instance.get(`${ROOT_URL}/recipe_category?limit=${limit}&page=${page}`)
            .then((response) => {
                dispatch(fetchCat(response));
            })
            .catch((error) => {
                dispatch({
                    type: "UNAUTHENTICATED",
                    payload: "Invalid authentication credentials"
                });
                localStorage.removeItem('current_user');
                notify.show(error.response.data.message, 'error', 5000);
            });
            
        }else {
            const limit = 10;
            const request = await instance.get(`${ROOT_URL}/recipe_category?limit=${limit}`)
            .then((response) => {
                dispatch(fetchCat(response));
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
    }
}

// action creator for fetching single category
export const fetchCategory = (id) =>{
    return async (dispatch) => {
        try {
            const request = await instance.get(`${ROOT_URL}/recipe_category/${id}`);
            
            dispatch({
                type: FETCH_CATEGORY,
                payload: request
            });
        }catch(error) {
            dispatch({
                type: "UNAUTHENTICATED",
                payload: "Invalid or expired token please login again"
            })
            localStorage.removeItem('current_user');
            notify.show(error.response.data.message, 'error', 5000);
        }
    }

}

