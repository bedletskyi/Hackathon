import { combineReducers } from 'redux';
import searchData from '../SearchComponent/searchReducer';
import filterData from '../Filter/filterReducer';
import productsData from '../ProductCardsWrapper/productCardsReducer';
import statisticsData from '../StatisticsModal/statisticsModalReducer';

const rootReducer = combineReducers({
    searchData,
    filterData,
    productsData,
    statisticsData
});

export default rootReducer;
