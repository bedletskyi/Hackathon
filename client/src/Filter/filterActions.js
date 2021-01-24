export const SET_FILTERED_ITEMS = 'SET_FILTERED_ITEMS';

export function filterItems({ priceRange, weightRange, brands }) {
    return (dispatch, getStore) => {
        const store = getStore();
        const filteredItems = store.items.filter((item) => {
            return (
                priceRange[0] < item.price &&
                priceRange[1] > item.price &&
                weightRange[0] < item.weight &&
                weightRange[1] > item.weight &&
                brands.includes(item.brand)
            );
        });

        dispatch({
            type: SET_FILTERED_ITEMS,
            filteredItems,
        });
    };
}
