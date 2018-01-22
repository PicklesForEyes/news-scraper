const db = require('../models');
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = (app) => {

  app.get('/api/scrape', (req, res) => {
    axios.get('https://www.reddit.com/r/oneliners/')
      .then((result) => {
        let $ = cheerio.load(result.data);
        res.send(result.data)
        $('p.title').each((i, element) => {
          let item = {};
          let title = $(element).text();
          let link = `https://www.reddit.com${$(element).children().attr('href')}`;

          item.title = title;
          item.link = link;

          console.log(item)

          db.Article
            .create(item)
            .then(dbArticle => {
              res.send(dbArticle)
              console.log(dbArticle)
            })
            .catch(err => res.json(err))
        })


      })
      .catch(err => console.log(err));
  })

  app.get('/api/articles', (req, res) => {
    db.Article
      .find({})
      .then(dbArticle => {
        res.json(dbArticle);
      })
      .catch(err => {
        res.json(err);
      })
  })

  app.put('/api/saved/:id', (req, res) => {
    db.Article
      .findOneAndUpdate(
          { _id: req.params.id },
          { $set: { saved: req.body.saved }}
        )
      .then(dbArticle => {
        res.send(dbArticle)
      })
  })

  app.get('/api/saved', (req, res) => {
    db.Article
      .find({ saved: true })
      .then(dbArticle => {
        res.json(dbArticle);
      })
      .catch(err => {
        res.json(err);
      })
  })

  app.get('/api/articles/:id', (req, res) => {
    db.Article
    .findOne({ _id: req.params.id })
    .populate('note')
    .then(dbArticle => {
      res.json(dbArticle);
    })
    .catch(err => {
      res.json(err);
    })
  })

  app.post('/api/articles/:id', (req, res) => {
    db.Note
    .create(req.body)
    .then(dbNote => {
      return db.Article.findOneAndUpdate(
        { _id: req.params.id },
        { note: dbNote._id },
        { new: true }
      );
    })
    .catch(err => {
      res.json(err);
    })
  })

}