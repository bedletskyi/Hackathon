const mongoose = require('mongoose')
const MONGODB_URI=`mongodb://localhost:27017/StatisticsDB`
mongoose.connect(MONGODB_URI,{useNewUrlParser: true, useUnifiedTopology: true})

const PriceForDaySchema = new mongoose.Schema({
    pointOfSale:String,
    dayOfCapture: Date,
    price:Number
})
const PriceForDay = mongoose.model('PriceForDay',PriceForDaySchema)
const availablePointsOfSale = ['auchan','epicentrk','fozy']

export const dbService = {

    saveStatistics(statistics){
        statistics.forEach(pointOfSaleStatistic => {
            const statisticsInstance = new PriceForDay(pointOfSaleStatistic);
            statisticsInstance.save((err,result)=>{
                if(err) {
                    return [];
                }
                console.log(result)
                return result
            })
        })
    },

    async getStatistics(pointOfSale){
        if(pointOfSale){
            return await PriceForDay.find({ pointOfSale }).sort({dayOfCapture:1}).exec();
        }
        const statistics ={};
        for(pointOfSaleName of availablePointsOfSale){
            const pointOfSaleStatistics = await PriceForDay.find({ pointOfSale: pointOfSaleName}).sort({dayOfCapture:1}).exec();
            return Object.assign(statistics,{[pointOfSaleName]:pointOfSaleStatistics})
        }
        return statistics;
}
}
