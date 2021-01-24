const {dbService} = require('../services/dbService');
const {parserService} = require('../services/parserService');

const SELECTED_SEARCH_REQUEST = "крупа гречана";

const addPriceInPointsOfSaleToStatisticsDb = () =>{

    const epicentrItems = await this.getEpicentrItems(SELECTED_SEARCH_REQUEST);
    const auchanItems = await this.getAuchanItems(SELECTED_SEARCH_REQUEST);
    const fozzyshopItems = await this.getFozzyshopItems(SELECTED_SEARCH_REQUEST);

    const epicentrMinPricePerKilo = epicentrItems
        .map(dataFromSite => dataFromSite.price/dataFromSite.weigth).min();
    const auchanMinPricePerKilo = auchanItems
        .map(dataFromSite => dataFromSite.price/dataFromSite.weigth).min();
    const fozzyMinPricePerKilo = fozzyshopItems
        .map(dataFromSite => dataFromSite.price/dataFromSite.weigth).min();

    const dataConvertedToSavingFormat = [
        {
            pointOfSale:'epicentrk.ua',
            dayOfCapture: new Date(),
            price:epicentrMinPricePerKilo
        },
        {
            pointOfSale:'auchan.zakaz.ua',
            dayOfCapture: new Date(),
            price:auchanMinPricePerKilo
        },
        {
            pointOfSale:'fozzyshop.ua',
            dayOfCapture: new Date(),
            price:fozzyMinPricePerKilo
        }
    ]

    dbService.saveStatistics(dataConvertedToSavingFormat);
console.log('seeding')
}

module.exports = {
addPriceInPointsOfSaleToStatisticsDb
}