const express = require('express');
const router = express.Router();

let options = {
  title: 'STEM Opportunity Portal!!',
  layout: 'default',
  styles: ['/stylesheets/style.css', '/stylesheets/old-style.css']
}

router.get('/', async function(req, res, next) {
  res.render('index', options);
});

module.exports = router;
