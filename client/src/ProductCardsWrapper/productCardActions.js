import { FROM_LOWER_SORT_STRATEGY } from './sortStrategies';

export const SET_PRODUCTS_TO_SHOW = 'SET_PRODUCTS_TO_SHOW';
export const SET_PRODUCTS = 'SET_PRODUCTS';
export const SET_SORT_SETTINGS = 'SET_SORT_SETTINGS';
export const SET_LOADING_STATE = 'SET_LOADING_STATE';

export const setProductsToShow = (products = []) => {
    return {
        type: SET_PRODUCTS_TO_SHOW,
        products,
    };
};

export const setProducts = (products = []) => {
    return {
        type: SET_PRODUCTS,
        products,
    };
};

export const setSortSettings = (sortStrategy = FROM_LOWER_SORT_STRATEGY) => {
    return (dispatch, getStore) => {
        const store = getStore();

        const sortedProducts = store.productsData.productsToShow.sort((product) => product.price);

        dispatch({
            type: SET_SORT_SETTINGS,
            sortStrategy,
        });

        dispatch(setProductsToShow(sortedProducts));
    };
};

export const startLoading = () => {
    return {
        type: SET_LOADING_STATE,
        loading: true
    }
}

export const stopLoading = () => {
    return {
        type: SET_LOADING_STATE,
        loading: false
    }
}