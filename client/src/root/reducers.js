import { combineReducers } from 'redux';
import searchData from '../SearchComponent/searchReducer';
import filterData from '../Filter/filterReducer';
import productsData from '../ProductCardsWrapper/productCardsReducer';

const rootReducer = combineReducers({
    searchData,
    filterData,
    productsData,
});

export default rootReducer;
