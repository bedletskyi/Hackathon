const express = require('express');
const app = express();
const cors=require('cors');
const bodyParser=require('body-parser');
const parserService = require('./services/parserService');
const {dbService} = require('./services/dbService');
const {addPriceInPointsOfSaleToStatisticsDb} = require('./helpers/cronJobHelper');
const cron = require('node-cron')

const port = 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/price', (req, res) => {
  const searchQuery = req.query.search || 'fisting';
res.send({value:`${searchQuery} is 300$`})
})

app.get('/stats', (req, res) => {
  const pointOfSale = req.query.pointOfSale;
  dbService.getStatistics(pointOfSale).then(result =>{
    res.send({statistics:result});
  }).catch(err=>{
    res.status(500).send(`Can not get statistics\n\n${err}`);
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})

cron.schedule("00 30 20 * * *",()=>{
    addPriceInPointsOfSaleToStatisticsDb();
})