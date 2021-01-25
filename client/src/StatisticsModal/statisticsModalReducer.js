import {TOGGLE_STATISTICS_MODAL, TOGGLE_STATISTICS_SPINNER } from './statisticsModalActions';

const initialState = {
    showStatisticsModal: false,
    statisticsIsLoading: false
};

export default function productsData(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_STATISTICS_MODAL:
            return { ...state, showStatisticsModal: !state.showStatisticsModal };
        case TOGGLE_STATISTICS_SPINNER:
            return {...state, statisticsIsLoading: !state.statisticsIsLoading };
        default:
            return state;
    }
}
