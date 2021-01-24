import { SET_FILTERED_ITEMS } from './filterActions';

const initialState = {
    items: [],
    itemsToShow: [],
};

export default function exampleReducer(state = initialState, action) {
    switch (action.type) {
        case SET_FILTERED_ITEMS:
            return { ...state, itemsToShow: action.filteredItems };
        default:
            return state;
    }
}
