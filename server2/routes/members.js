var express = require('express');
var router = express.Router();
var bl = require('../BL/membersBL')
var subBL = require('../BL/subscriptionsBL');

/* GET all subscriptions */
router.get('/', async function(req, res, next) {
  // populate db collection
  let items = await bl.getAll();
  return res.json(items);
});

router.get('/:id', async (req, res, next) => {
  let items = await bl.getItemById(req.params.id);
  return res.json(items);
})

// Create a new member
router.post('/', async (req, res, next) => {
  console.log('👻 members add item body %j', req.body);
  
  let item = await bl.addItem(req.body);
  await subBL.addItem({MemberId: item._id, Movies:[]});
  let items = await bl.getAll();
  return res.json(items);
});

router.put('/:id', async (req, res, next) => {
  let id = req.params.id;
  let items = await bl.updateItem(id, req.body);
  return res.json({members: items});
});

router.delete('/:id', async (req, res, next) => {
  let id = req.params.id;
  let items = await bl.deleteItem(id);
  await subBL.deleteItem(id);
  return res.json(items);
})

module.exports = router;
