export const TOGGLE_STATISTICS_MODAL = 'TOGGLE_STATISTICS_MODAL';
export const TOGGLE_STATISTICS_SPINNER = 'TOGGLE_STATISTICS_SPINNER';

export const toggleStatisticsModal = () => {
    return {
        type: TOGGLE_STATISTICS_MODAL,

    }
}

export const toggleStatisticsSpinner = () => {
    return {
        type: TOGGLE_STATISTICS_SPINNER,

    }
}