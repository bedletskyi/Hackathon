import { setProductsToShow, sortProducts } from '../ProductCardsWrapper/productCardActions';

export const SET_FILTER_OPTIONS = 'SET_FILTER_OPTIONS';

export function filterItems({ priceRange, weightRange }) {
    return (dispatch, getStore) => {
        const store = getStore();
        const filteredItems = store.productsData.products.filter((item) => {
            return (
                priceRange[0] <= item.price &&
                priceRange[1] >= item.price &&
                weightRange[0] <= item.weight * 1000 &&
                weightRange[1] >= item.weight * 1000
            );
        });

        dispatch(setProductsToShow(filteredItems));
        dispatch(sortProducts())
    };
}

export function setDefaultFilterOptions() {
    return (dispatch, getStore) => {
        const store = getStore();
        const maxProductPrice = Math.max(...store.productsData.products.map((product) => product.price));
        const maxProductWeight = Math.max(...store.productsData.products.map((product) => product.weight * 1000));

        const maxPrice = maxProductPrice < 0 ? 1000 : maxProductPrice;
        const maxWeight = maxProductWeight < 0 ? 1000 : maxProductWeight;

        dispatch({
            type: SET_FILTER_OPTIONS,
            options: {
                maxPrice,
                maxWeight,
            },
        });
        dispatch(
            filterItems({
                priceRange: [0, maxPrice],
                weightRange: [0, maxWeight],
            })
        );
    };
}
