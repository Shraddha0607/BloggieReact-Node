const express = require('express');

const {
  getAll,
  get,
  remove,
  add,
  replace
} = require('../data/post');
const {
  checkAuth
} = require('../util/auth');
const {
  isValidText,
  isValidDate
} = require('../util/validation');

const router = express.Router();

router.get('/', async (req, res, next) => {
  console.log(req.token);
  try {
    const posts = await getAll();
    res.json({
      posts: posts
    });
  } catch (error) {
    next(error);
  }
});


router.get('/:id', async (req, res, next) => {
  try {
    const tag = await get(req.params.id);
    res.json({
      post: post
    });
  } catch (error) {
    next(error);
  }
});

router.post('/urlGenerate', async (req, res, next) => {
  try {

    const data = req.body;
    console.log(data, " in bk");

    let url = data.fileName;
    let size = data.fileContent.length;
    let currentTime = new Date();

    url = data.fileName + size + currentTime;
    res.json({
      url: url
    });

  } catch (error) {
    console.log(error);
    next(error);
  }
})

router.use(checkAuth);

router.post('/', async (req, res, next) => {
  console.log(req.token);
  const data = req.body;

  let errors = {};

  if (!isValidText(data.heading)) {
    errors.heading = 'Invalid heading.';
  }

  if (!isValidText(data.title)) {
    errors.title = 'Invalid title.';
  }

  if (!isValidText(data.content)) {
    errors.content = 'Invalid content.';
  }

  if (!isValidText(data.shortDescription)) {
    errors.shortDescription = 'Invalid short description.';
  }

  if (!isValidImageUrl(data.imageUrl)) {
    errors.imageUrl = 'Invalid image.';
  }

  if (!isValidText(data.urlHandler)) {
    errors.urlHandler = 'Invalid URL Handler.';
  }

  if (!isValidDate(data.date)) {
    errors.date = 'Invalid date.';
  }

  if (!isValidText(data.author)) {
    errors.author = 'Invalid author.';
  }


  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: 'Adding the post failed due to validation errors.',
      errors,
    });
  }

  try {
    await add(data);
    res.status(201).json({
      message: 'Post saved.',
      post: data
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  const data = req.body;

  let errors = {};

  if (!isValidText(data.heading)) {
    errors.heading = 'Invalid heading.';
  }

  if (!isValidText(data.title)) {
    errors.title = 'Invalid title.';
  }

  if (!isValidText(data.content)) {
    errors.content = 'Invalid content.';
  }

  if (!isValidText(data.shortDescription)) {
    errors.shortDescription = 'Invalid short description.';
  }

  if (!isValidImageUrl(data.imageUrl)) {
    errors.imageUrl = 'Invalid image.';
  }

  if (!isValidText(data.urlHandler)) {
    errors.urlHandler = 'Invalid URL Handler.';
  }

  if (!isValidDate(data.date)) {
    errors.date = 'Invalid date.';
  }

  if (!isValidText(data.author)) {
    errors.author = 'Invalid author.';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: 'Updating the post failed due to validation errors.',
      errors,
    });
  }

  try {
    await replace(req.params.id, data);
    res.json({
      message: 'Post updated.',
      post: data
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await remove(req.params.id);
    res.json({
      message: 'Post deleted.'
    });
  } catch (error) {
    next(error);
  }
});



module.exports = router;