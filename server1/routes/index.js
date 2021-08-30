const { request } = require('express');
var express = require('express');
var router = express.Router();
var usersBL = require('../BL/usersBL')

let didSessionExpire = (session) => {return false;
	if (session.cookie.expires == null) { return true;}
	  let timeToExpire = (Date.parse(session.cookie.expires) - Date.now())/1000;
	  return timeToExpire == null ||timeToExpire == 'undefined' || timeToExpire < 0;
  }

/* GET home page. */
router.get('/', async function(req, res, next) {
  if (didSessionExpire(req.session)) {
		res.redirect("login?message=Your session has expired, please login again.");
	} else  
  if (req.session !== undefined && req.session.username) {
    let user = usersBL.sessionUser(req.session);
    let errorMessage = ""
    if (req.query.error) {
      errorMessage = req.query.error;
    }
    res.render('main', {title: "Subscriberz", user:user, error: errorMessage});
  } else {
    res.redirect('login');
  }
});


module.exports = router;
