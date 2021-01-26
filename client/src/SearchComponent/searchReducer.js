import { SEARCH_QUERY } from './searchActions';

const initialState = {
    query: '',
};

export default function searchData(state = initialState, action) {
    switch (action.type) {
        case SEARCH_QUERY:
            return { ...state, query: action.query };
        default:
            return state;
    }
}
