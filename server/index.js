const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { parserService } = require('./services/parserService');

const port = 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/products', (req, res, next) => {
    const searchQuery = req.query.search || 'гречка';
    parserService
        .getDataFromSites(searchQuery)
        .then((products) => {
            console.log(products)
            res.send({ value: products });
        })
        .catch((err) => {
            console.log(err);
            next(err);
        });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
