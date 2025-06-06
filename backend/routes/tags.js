const express = require('express');

const { getAll, remove } = require('../data/tag');

const router = express.Router();

router.get('/', async (req, res, next) => {
  console.log(req.token);
  try {
    const tags = await getAll();
    res.json({ tags: tags });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await remove(req.params.id);
    res.json({ message: 'Tag deleted.' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
