import { combineReducers } from 'redux';
import exampleReducer from '../ExampleComponent/exampleReducer';
import filterReducer from '../Filter/filterReducer';

const rootReducer = combineReducers({
    exampleReducer,
    filterReducer,
});

export default rootReducer;
