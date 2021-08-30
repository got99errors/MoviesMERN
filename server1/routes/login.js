var express = require('express');
var router = express.Router();
var usersBL = require('../BL/usersBL');

router.post('/', async function(req, res, next) {
  let loginDetails = req.body;
  let canLogin = await usersBL.canLogin(loginDetails)
  
  if (canLogin == "ok") {
    // Successful login
    let user = await usersBL.userDidLogin(req, loginDetails.username);
    res.json(user)
  } else {
    res.json({error: canLogin})
  }
});

router.post('/signup', async (req, res, next) => {
  let validationResult = await usersBL.validateNewAccount(req.body);
  if (validationResult == "ok") {
    let user = await usersBL.userDidLogin(req, req.body.username);
    res.json(user)
  } else {
    res.json({error: validationResult})
  }
});

module.exports = router;
