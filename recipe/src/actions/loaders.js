import { IS_LOADING, NOT_LOADING } from '../constants/index';

export const activateLoading = () => {
    //activateLoader
    return {
        type: IS_LOADING
    }
}

export const deactivateLoading = () => {
    //deactivateLoader
    return {
        type: NOT_LOADING
    }
}