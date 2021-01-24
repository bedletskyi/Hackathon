import { SET_FILTER_OPTIONS } from './filterActions';

const initialState = {
    filterOptions: {
        maxPrice: 2000,
        maxWeight: 100,
    },
};

export default function filterData(state = initialState, action) {
    switch (action.type) {
        case SET_FILTER_OPTIONS:
            return { ...state, filterOptions: action.options };
        default:
            return state;
    }
}
