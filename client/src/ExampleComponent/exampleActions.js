export const SEARCH_ACTION= 'SEARCH_ACTION';
export const SET_FOUND_DATA='SET_FOUND_DATA';

export function searchAction(query){
    return (dispatch)=>{
        const url=new URL('http://localhost:5000/price');
        const params={search:query};
        url.search=new URLSearchParams(params).toString();

        fetch(url).then(async (response)=>{
            if(response.ok){
                const {value} = await response.json()
                dispatch(setFoundData(value))
            }else{
                debugger;
            }
        })
    }
}

export const setFoundData = (foundData)=>({
    type:SET_FOUND_DATA,
    foundData
})