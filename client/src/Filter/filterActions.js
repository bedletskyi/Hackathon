import { setProductsToShow } from '../ProductCardsWrapper/productCardActions';

export const SET_FILTER_OPTIONS = 'SET_FILTER_OPTIONS';

export function filterItems({ priceRange, weightRange }) {
    return (dispatch, getStore) => {
        const store = getStore();
        const filteredItems = store.productsData.products.filter((item) => {
            return (
                priceRange[0] <= item.price &&
                priceRange[1] >= item.price &&
                weightRange[0] <= item.weight &&
                weightRange[1] >= item.weight
            );
        });

        dispatch(setProductsToShow(filteredItems));
    };
}

export function setDefaultFilterOptions() {
    return (dispatch, getStore) => {
        const store = getStore();
        const maxPrice = Math.max(...store.productsData.products.map((product) => product.price));
        const maxWeight = Math.max(...store.productsData.products.map((product) => product.weight));

        dispatch({
            type: SET_FILTER_OPTIONS,
            options: {
                maxPrice,
                maxWeight,
            },
        });
    };
}
