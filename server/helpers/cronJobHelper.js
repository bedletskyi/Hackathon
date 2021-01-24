const {dbService} = require('../services/dbService');
const {parserService} = require('../services/parserService');

const SELECTED_SEARCH_REQUEST = "крупа гречана";

const addPriceInPointsOfSaleToStatisticsDb = () =>{

    parserService.getTaggedDataFromSites(SELECTED_SEARCH_REQUEST,(data =>{
        const dataConvertedToSavingFormat = Object.keys(data).map(site=>{
            return{
           pointOfSale:site,
           dayOfCapture: new Date(),
           price:getMinPricePerKilo(data[site])
        }})
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