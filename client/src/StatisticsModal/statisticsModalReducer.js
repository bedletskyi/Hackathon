import {TOGGLE_STATISTICS_MODAL, TOGGLE_STATISTICS_SPINNER,SET_STATISTICS } from './statisticsModalActions';

const initialState = {
    showStatisticsModal: false,
    statisticsIsLoading: false,
    statistics: []
};

export default function productsData(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_STATISTICS_MODAL:
            return { ...state, showStatisticsModal: !state.showStatisticsModal };
        case TOGGLE_STATISTICS_SPINNER:
            return {...state, statisticsIsLoading: !state.statisticsIsLoading };
        case SET_STATISTICS:
            return {...state, statistics:action.statistics}
        default:
            return state;
    }
}
