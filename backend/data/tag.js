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

async function add(data) {
  const storedData = await readData();
  storedData.tags.unshift({ ...data, id: generateId() });
  await writeData(storedData);
}

async function remove(id) {
  const storedData = await readData();
  const updatedData = storedData.tags.filter((tag) => tag.id !== id);
  await writeData({ ...storedData, tags: updatedData });
}

exports.getAll = getAll;
exports.remove = remove;
exports.add = add;