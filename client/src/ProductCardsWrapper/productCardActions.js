export const SET_PRODUCTS_TO_SHOW = 'SET_PRODUCTS_TO_SHOW';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const setProductsToShow = (products = []) => {
    return {
        type: SET_PRODUCTS_TO_SHOW,
        products
    }
}

export const setProducts = (products = []) => {
    return {
        type: SET_PRODUCTS,
        products
    }
}