const express = require('express');
const router = express.Router();

const Article = require('../models/Article.js');
const Note = require('../models/Note.js');

router.get('/', (req, res) => {
  
})

router.get('/scrape', (req, res) => {

})

router.get('/articles', (req, res) => {
  db.Article
    .find({})
    .then(dbArticle => {
      res.json(dbArticle)
    })
    .catch(err => {
      res.json(err);
    })
})