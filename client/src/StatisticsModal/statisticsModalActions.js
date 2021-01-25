export const TOGGLE_STATISTICS_MODAL = 'TOGGLE_STATISTICS_MODAL';
export const SET_STATISTICS = 'SET_STATISTICS';

export const toggleStatisticsModal = () => {
    return {
        type: TOGGLE_STATISTICS_MODAL,

    }
}

export const loadStatistics = (period) => {
    return (dispatch) => {
        const url = new URL('http://localhost:5000/stats');
        const params = { search:period }
        url.search = new URLSearchParams(params).toString();
        fetch(url).then(async (response) => {
            if (response.ok) {
                const { statistics } = await response.json();
                dispatch(setStatistics(statistics));
            }
        });
    }
}

export const setStatistics = (statistics) =>
    ({
        type: SET_STATISTICS,
        statistics
    })