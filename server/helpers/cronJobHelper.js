const {dbService} = require('../services/dbService');
const {parserService} = require('../services/parserService');

const SELECTED_SEARCH_REQUEST = "крупа гречана";

const addPriceInPointsOfSaleToStatisticsDb = () =>{

    parserService.getTaggedDataFromSites(SELECTED_SEARCH_REQUEST,(data =>{
        const dataConvertedToSavingFormat = 
            Object.keys(data)
            .reduce((statistics, site)=>({...statistics,[site]:getMinPricePerKilo(data[site])})
           ,{dayOfCapture: new Date()})
           dbService.saveStatistics(dataConvertedToSavingFormat);
    }))
}

const getMinPricePerKilo = (items) =>{
    const pricesPerKilo = items.map(item => {
        return item.price/item.weight
    })
    return Math.min(...pricesPerKilo)
}

module.exports = {
    addPriceInPointsOfSaleToStatisticsDb
}