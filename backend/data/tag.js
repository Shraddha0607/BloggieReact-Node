const { v4: generateId } = require('uuid');

const { NotFoundError } = require('../util/errors');
const { readData, writeData } = require('./util');

async function getAll() {
  const storedData = await readData();
  if (!storedData.tags) {
    throw new NotFoundError('Could not find any tags.');
  }
  return storedData.tags;
}

async function get(id) {
  const storedData = await readData();
  if (!storedData.tags || storedData.tags.length === 0) {
    throw new NotFoundError('Could not find any tags.');
  }

  const tag = storedData.tags.find((tag) => tag.id === id);
  if (!tag) {
    throw new NotFoundError('Could not find tag for id ' + id);
  }

  return tag;
}

async function add(data) {
  const storedData = await readData();
  storedData.tags.unshift({ ...data, id: generateId() });
  await writeData(storedData);
}

async function replace(id, data) {
  const storedData = await readData();
  if (!storedData.tags || storedData.tags.length === 0) {
    throw new NotFoundError('Could not find any tags.');
  }

  const index = storedData.tags.findIndex((tag) => tag.id === id);
  if (index < 0) {
    throw new NotFoundError('Could not find tag for id ' + id);
  }

  storedData.tags[index] = { ...data, id };

  await writeData(storedData);
}

async function remove(id) {
  const storedData = await readData();
  const updatedData = storedData.tags.filter((tag) => tag.id !== id);
  await writeData({ ...storedData, tags: updatedData });
}

exports.getAll = getAll;
exports.get = get;
exports.remove = remove;
exports.add = add;
exports.replace = replace;