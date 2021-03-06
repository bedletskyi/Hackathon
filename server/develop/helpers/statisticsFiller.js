const {dbService} = require('../services/dbService');
const fs = require('fs')
const path = require('path')


const MOCK_STATISTICS_FILE = "/../mocks/mocked_statistics.json";

const fillStatistics = () =>{
    dbService.getStatistics(7).then(result=>{
        if(result.length===0){
            const content = fs.readFileSync(path.resolve(__dirname + MOCK_STATISTICS_FILE), "utf8");
            const mockStatistics = JSON.parse(content).statistics;
            mockStatistics.forEach(sign => dbService.saveStatistics(sign))
        }
    })
    
}

module.exports = {
    fillStatistics
}