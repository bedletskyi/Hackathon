import { searchAction } from '../SearchComponent/searchActions';
import { FROM_LOWER_SORT_STRATEGY } from './sortStrategies';

export const SET_PRODUCTS_TO_SHOW = 'SET_PRODUCTS_TO_SHOW';
export const SET_PRODUCTS = 'SET_PRODUCTS';
export const SET_SORT_SETTINGS = 'SET_SORT_SETTINGS';
export const SET_LOADING_STATE = 'SET_LOADING_STATE';
export const INITIAL_SEARCH_CALLED = 'INITIAL_SEARCH_CALLED';

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

export const sortProducts = () => {
    return (dispatch, getStore) => {
        const store = getStore();

        const sortedProducts = store.productsData.productsToShow.sort((product1, product2) => {
            if (store.productsData.sortStrategy === FROM_LOWER_SORT_STRATEGY) {
                return product1.price - product2.price;
            }

            return product2.price - product1.price;
        });

        dispatch(setProductsToShow(sortedProducts));
    };
};

export const setSortSettings = (sortStrategy = FROM_LOWER_SORT_STRATEGY) => {
    return (dispatch, getStore) => {
        dispatch({
            type: SET_SORT_SETTINGS,
            sortStrategy,
        });

        dispatch(sortProducts());
    };
};

export const startLoading = () => {
    return {
        type: SET_LOADING_STATE,
        loading: true,
    };
};

export const stopLoading = () => {
    return {
        type: SET_LOADING_STATE,
        loading: false,
    };
};

export const makeInitialSearch = () => {
    return (dispatch, getStore) => {
        const store = getStore();

        if (!store.productsData.initialSearchCalled) {
            dispatch(searchAction('Гречана крупа'));

            dispatch({
                type: INITIAL_SEARCH_CALLED,
            });
        }
    };
};
