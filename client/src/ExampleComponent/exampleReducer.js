import { SEARCH_ACTION,SET_FOUND_DATA } from "./exampleActions";

const initialState={
    query:'',
    foundData: ''
}

export default function exampleReducer(state=initialState, action){
    switch (action.type){
        case SEARCH_ACTION:
            return {...state, query:action.query}
        case SET_FOUND_DATA:
            return {...state, foundData:action.foundData}
        default:
            return state
    }
}