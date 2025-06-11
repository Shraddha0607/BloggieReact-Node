const {
  v4: generateId
} = require('uuid');

const {
  NotFoundError
} = require('../util/errors');
const {
  readData,
  writeData
} = require('./util');

async function getAll() {
  const storedData = await readData();
  if (!storedData.posts) {
    throw new NotFoundError('Could not find any posts.');
  }
  return storedData.posts;
}

async function get(id) {
  const storedData = await readData();
  if (!storedData.posts || storedData.posts.length === 0) {
    throw new NotFoundError('Could not find any posts.');
  }

  const post = storedData.posts.find((post) => post.id === id);
  if (!post) {
    throw new NotFoundError('Could not find post for id ' + id);
  }

  return post;
}

async function getByUrl(urlHandler) {
  const storedData = await readData();
  if (!storedData.posts || storedData.posts.length === 0) {
    throw new NotFoundError('Could not find any posts.');
  }

  const post = storedData.posts.find((post) => post.urlHandler === urlHandler);
  if (!post) {
    throw new NotFoundError('Could not find post for urlHandler ' + urlHandler);
  }

  return post;
}

async function add(data) {
  const storedData = await readData();
  storedData.posts.unshift({
    ...data,
    id: generateId()
  });
  await writeData(storedData);
}

async function replace(id, data) {
  const storedData = await readData();
  if (!storedData.posts || storedData.posts.length === 0) {
    throw new NotFoundError('Could not find any posts.');
  }

  const index = storedData.posts.findIndex((post) => post.id === id);
  if (index < 0) {
    throw new NotFoundError('Could not find post for id ' + id);
  }

  storedData.posts[index] = {
    ...data,
    id
  };

  await writeData(storedData);
}

async function remove(id) {
  const storedData = await readData();
  const updatedData = storedData.posts.filter((post) => post.id !== id);
  await writeData({
    ...storedData,
    posts: updatedData
  });
}


async function dislike(id) {

  const storedData = await readData();
  if(!storedData.posts || storedData.posts.length === 0) {
    throw new NotFoundError('Could not find any posts.');
  }

  const index = storedData.posts.findIndex((post) => post.id === id);
  if(index < 0) {
    throw new NotFoundError('Could not find post for id ' + id);
  }

  const post = storedData.posts[index];

  storedData.posts[index] = {
    ...post,
    dislikes : (post.dislikes || 0 ) + 1
  };

  await writeData(storedData);
}

async function like(id) {

  const storedData = await readData();
  if(!storedData.posts || storedData.posts.length === 0) {
    throw new NotFoundError('Could not find any posts.');
  }

  const index = storedData.posts.findIndex((post) => post.id === id);
  if(index < 0) {
    throw new NotFoundError('Could not find post for id ' + id);
  }

  const post = storedData.posts[index];

  storedData.posts[index] = {
    ...post,
    likes : (post.likes || 0 ) + 1
  };

  await writeData(storedData);
}

exports.getAll = getAll;
exports.get = get;
exports.remove = remove;
exports.add = add;
exports.replace = replace;
exports.getByUrl = getByUrl;
exports.dislike = dislike;
exports.like = like;