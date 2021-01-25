import { setDefaultFilterOptions } from '../Filter/filterActions';
import { setProducts, setProductsToShow, setSortSettings, startLoading, stopLoading } from '../ProductCardsWrapper/productCardActions';

export const SEARCH_QUERY = 'SEARCH_QUERY';

export function searchAction(query) {
    return (dispatch) => {
        dispatch(startLoading())
        dispatch(setSearchQuery(query))
        const url = new URL('http://localhost:5000/products');
        const params = { search: query };
        url.search = new URLSearchParams(params).toString();

        fetch(url).then(async (response) => {
            if (response.ok) {
                const { value } = await response.json();

                dispatch(setProducts(value));
                dispatch(setProductsToShow(value));
                dispatch(setDefaultFilterOptions());
                dispatch(setSortSettings());
                dispatch(stopLoading())
            } else {
                debugger;
            }
        });
    };
}

export function setSearchQuery(query) {
    return {
        type: SEARCH_QUERY,
        query,
    }
}