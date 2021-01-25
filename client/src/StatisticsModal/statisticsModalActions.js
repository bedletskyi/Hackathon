export const TOGGLE_STATISTICS_MODAL = 'TOGGLE_STATISTICS_MODAL';
export const TOGGLE_STATISTICS_SPINNER = 'TOGGLE_STATISTICS_SPINNER';
export const SET_STATISTICS = 'SET_STATISTICS';

export const toggleStatisticsModal = () => {
    return {
        type: TOGGLE_STATISTICS_MODAL,

    }
}

export const loadStatistics = () => {
    return (dispatch) => {
        const url = new URL('http://localhost:5000/stats');
        dispatch(toggleStatisticsSpinner())
        fetch(url).then(async (response) => {
            if (response.ok) {
                const { statistics } = await response.json();
                console.log(statistics)
                dispatch(setStatistics(statistics));
                dispatch(toggleStatisticsSpinner())
            } else {
                debugger;
                dispatch(toggleStatisticsSpinner())
            }
        });
    }
}

export const setStatistics = (statistics) =>
    ({
        type: SET_STATISTICS,
        statistics
    })

export const toggleStatisticsSpinner = () => {
    return {
        type: TOGGLE_STATISTICS_SPINNER,

    }
}