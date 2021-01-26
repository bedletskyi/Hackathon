import { SET_PRODUCTS_TO_SHOW, SET_PRODUCTS, SET_SORT_SETTINGS, SET_LOADING_STATE, INITIAL_SEARCH_CALLED } from './productCardActions';
import { FROM_LOWER_SORT_STRATEGY } from './sortStrategies';

const initialState = {
    products: [],
    productsToShow: [],
    sortStrategy: FROM_LOWER_SORT_STRATEGY,
    loading: false,
    initialSearchCalled: false
};

export default function productsData(state = initialState, action) {
    switch (action.type) {
        case SET_PRODUCTS_TO_SHOW:
            return { ...state, productsToShow: action.products };
        case SET_PRODUCTS:
            return { ...state, products: action.products };
        case SET_SORT_SETTINGS:
            return { ...state, sortStrategy: action.sortStrategy };
        case SET_LOADING_STATE:
            return { ...state, loading: action.loading };
        case INITIAL_SEARCH_CALLED:
            return { ...state, initialSearchCalled: true}
        default:
            return state;
    }
}
