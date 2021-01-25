const express = require('express');
const app = express();
const {dbService} = require('./services/dbService');
const {addPriceInPointsOfSaleToStatisticsDb} = require('./helpers/cronJobHelper');
const cron = require('node-cron')
const cors = require('cors');
const bodyParser = require('body-parser');
const { parserService } = require('./services/parserService');

const port = 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/stats', (req, res) => {
  const pointOfSale = req.query.pointOfSale;
  dbService.getStatistics(pointOfSale).then(result =>{
    res.send({statistics:result});
  }).catch(err=>{
    res.status(500).send(`Can not get statistics\n\n${err}`);
  })
})


app.get('/products', (req, res, next) => {
    const searchQuery = req.query.search || 'гречка';
    console.log(searchQuery);
    parserService
        .getDataFromSites(searchQuery)
        .then((products) => {
            console.log('products')
            res.send({ value: products.filter(product => product.weight) });
        })
        .catch((err) => {
            console.error(err);
            res.status(404).send(err);
        });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});


cron.schedule("00 00 00 * * *",()=>{
     addPriceInPointsOfSaleToStatisticsDb();
})
