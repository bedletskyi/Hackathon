import {TOGGLE_STATISTICS_MODAL,SET_STATISTICS } from './statisticsModalActions';

const initialState = {
    showStatisticsModal: false,
    statistics: []
};

export default function productsData(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_STATISTICS_MODAL:
            return { ...state, showStatisticsModal: !state.showStatisticsModal };
        case SET_STATISTICS:
            return {...state, statistics:action.statistics}
        default:
            return state;
    }
}
