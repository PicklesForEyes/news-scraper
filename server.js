const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const axios = require('axios');
const cheerio = require('cheerio');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines'

const db = require('./models');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/week18Populator');

app.get('/db/scrape', (req, res) => {
  axios.get('https://www.nytimes.com/?WT.z_jog=1&hF=t&vS=undefined')
    .then(response => {
      let $ = cheerio.load(response.data);
      $('h2 .story-heading').each((i, div) => {
        const result = {};

        result.title = $(this).children('a').text();
        result.summary = $(this).children('p').text();
        result.link = $(this).children('a').attr('href');

        db.Article
          .create(result)
          .then(dbArticle => {
            console.log(dbArticle);
          })
          .catch(err => {
            return res.json(err);
          });
      });

      res.send('Scrape Complete')
    })
})




app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})