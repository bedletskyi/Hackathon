const mongoose = require('mongoose')
const moment = require('moment');
const MONGODB_URI=`mongodb://localhost:27017/StatisticsDB`
mongoose.connect(MONGODB_URI,{useNewUrlParser: true, useUnifiedTopology: true})

const StatisticsForDaySchema = new mongoose.Schema({
    dayOfCapture: Date,
    auchanPrice:Number,
    epicentrPrice:Number,
    fozzyPrice:Number,
})
const StatisticsForDay = mongoose.model('StatisticsForDay',StatisticsForDaySchema)

export const dbService = {

    saveStatistics(statistics){
        const statisticsInstance = new StatisticsForDay(statistics);
        statisticsInstance.save((err,result)=>{
            if(err) {
                throw new Error(err.message)
            }
            return result
        })
    },

    async getStatistics(period){
        //StatisticsForDay.remove({},()=>{})
        const statistics = await StatisticsForDay.find({dayOfCapture: { $gte: moment(new Date()).subtract(period, 'days') }} ).sort({dayOfCapture:1}).exec();
        return statistics.map(statisticsMember => {
            return {...statisticsMember._doc, "dayOfCapture":moment(statisticsMember.dayOfCapture).format("DD/MM/YYYY")}
        })
}
}
