const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const axios = require('axios');
const cheerio = require('cheerio');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines'

const db = require('./models');

const PORT = process.env.PORT || 3000;

const app = express();

// bodyparser and handlebars setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// initiates proper connection to mongo
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/mongoHeadlines');



// initiates routing
require('./controllers/api-controller.js')(app);
require('./controllers/html-controller.js')(app);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})