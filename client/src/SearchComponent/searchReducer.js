import { SEARCH_ACTION } from "./searchActions";

const initialState={
    query:'',
}

export default function searchData(state=initialState, action){
    switch (action.type){
        case SEARCH_ACTION:
            return {...state, query:action.query}
        default:
            return state
    }
}