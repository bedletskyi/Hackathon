const mongoose = require('mongoose')
const moment = require('moment');
const MONGODB_URI=`mongodb://localhost:27017/StatisticsDB`
mongoose.connect(MONGODB_URI,{useNewUrlParser: true, useUnifiedTopology: true})

const StatisticsForDaySchema = new mongoose.Schema({
    dayOfCapture: Date,
    auchnPrice:Number,
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

    async getStatistics(){
        const statistics = await StatisticsForDay.find().sort({dayOfCapture:1}).exec();
        return statistics.map(statisticsMember => {
            return {...statisticsMember._doc, "dayOfCapture":moment(statisticsMember.dayOfCapture).format("DD/MM/YYYY")}
        })
}
}
