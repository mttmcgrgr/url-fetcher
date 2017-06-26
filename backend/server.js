const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
var cors = require('cors')
const app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors())
app.use('/', routes)

const port = 4000
app.listen(port, () => { console.log(`running on ${port}`); });
