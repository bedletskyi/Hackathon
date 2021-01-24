import { setProductsToShow } from '../ProductCardsWrapper/productCardActions';

export function filterItems({ priceRange, weightRange }) {
    return (dispatch, getStore) => {
        const store = getStore();
        const filteredItems = store.productsData.products.filter((item) => {
            return (
                priceRange[0] < item.price &&
                priceRange[1] > item.price &&
                weightRange[0] < item.weight &&
                weightRange[1] > item.weight
            );
        });

        dispatch(setProductsToShow(filteredItems));
    };
}
