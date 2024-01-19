const express = require('express');
const router = express.Router();

const jokes = require('../data/jokes');
const error = require('../utilities/error');

router
  .route('/')
  .get((req, res) => {
    const links = [
      {
        href: 'jokes/:id',
        rel: ':id',
        type: 'GET',
      },
    ];

    res.json({ jokes, links });
  })
  .post((req, res, next) => {
    if (req.body.userId && req.body.title && req.body.content) {
      const joke = {
        id: jokes[jokes.length - 1].id + 1,
        userId: req.body.userId,
        title: req.body.title,
        content: req.body.content,
      };

      jokes.push(joke);
      res.json(jokes[jokes.length - 1]);
    } else next(error(400, 'Insufficient Data'));
  });

router
  .route('/:id')
  .get((req, res, next) => {
    const post = jokes.find((p) => p.id == req.params.id);

    const links = [
      {
        href: `/${req.params.id}`,
        rel: '',
        type: 'PATCH',
      },
      {
        href: `/${req.params.id}`,
        rel: '',
        type: 'DELETE',
      },
    ];

    if (post) res.json({ post, links });
    else next();
  })
  .patch((req, res, next) => {
    const joke = jokes.find((p, i) => {
      if (p.id == Number(req.params.id)) {
        for (const key in req.body) {
          jokes[i][key] = req.body[key];
        }
        return true;
      }
    });

    if (post) res.json(post);
    else next();
  })
  .delete((req, res, next) => {
    const post = jokes.find((p, i) => {
      if (p.id == req.params.id) {
        jokes.splice(i, 1);
        return true;
      }
    });

    if (post) res.json(post);
    else next();
  });

module.exports = router;