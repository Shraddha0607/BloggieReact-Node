const express = require('express');

const { getAll, get, remove, add, replace } = require('../data/tag');
const { checkAuth } = require('../util/auth');
const { isValidText } = require('../util/validation');

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


router.get('/:id', async (req, res, next) => {
  try {
    const tag = await get(req.params.id);
    res.json({ tag: tag });
  } catch (error) {
    next(error);
  }
});

router.use(checkAuth);

router.post('/', async (req, res, next) => {
  console.log(req.token);
  const data = req.body;

  let errors = {};

  if (!isValidText(data.name)) {
    errors.name = 'Invalid name.';
  }

  if (!isValidText(data.displayName)) {
    errors.displayName = 'Invalid display name.';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: 'Adding the tag failed due to validation errors.',
      errors,
    });
  }

  try {
    await add(data);
    res.status(201).json({ message: 'Tag saved.', tag: data });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  const data = req.body;

  let errors = {};

  if (!isValidText(data.name)) {
    errors.name = 'Invalid name.';
  }

  if (!isValidText(data.displayName)) {
    errors.displayName = 'Invalid display name.';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: 'Updating the tag failed due to validation errors.',
      errors,
    });
  }

  try {
    await replace(req.params.id, data);
    res.json({ message: 'Tag updated.', tag: data });
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
