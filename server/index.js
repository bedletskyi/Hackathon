const express = require('express');
const app = express();
const cors=require('cors');
const bodyParser=require('body-parser');

const port = 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/price', (req, res) => {
    const searchQuery = req.query.search || 'fisting';
  res.send({value:`${searchQuery} is 300$`})
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})