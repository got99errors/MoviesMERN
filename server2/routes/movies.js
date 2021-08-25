var express = require('express');
var router = express.Router();
var bl = require('../BL/moviesBL')

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

router.post('/', async (req, res, next) => {
  let items = await bl.addItem(req.body);
  return res.json(items);
});

router.put('/:id', async (req, res, next) => {
  let id = req.params.id;
  let items = await bl.updateItem(id, req.body);
  return res.json(items);
});

router.delete('/:id', async (req, res, next) => {
  let items = await bl.deleteItem(req.params.id);
  return res.json(items);
})

module.exports = router;
