var express = require('express');
var router = express.Router();
var moviesBL = require('../BL/moviesBL')
var membersBL = require('../BL/membersBL')
var subscriptionBL = require('../BL/subscriptionsBL')

/* GET home page. */
router.get('/', async function(req, res, next) {
  // populate collections
  let movies = await moviesBL.getAll();
  let members = await membersBL.getAll();
  subscriptionBL.createDemo(members, movies);
  
  res.render('index', { title: 'Express' });
});

// router.get('/api/get', )

module.exports = router;
