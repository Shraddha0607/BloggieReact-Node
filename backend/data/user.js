const { hash } = require('bcryptjs');
const { v4: generateId } = require('uuid');

const { NotFoundError } = require('../util/errors');
const { readData, writeData } = require('./util');

async function add(data) {
  const storedData = await readData();
  const userId = generateId();
  const hashedPw = await hash(data.password, 12);
  if (!storedData.users) {
    storedData.users = [];
  }
  storedData.users.push({ ...data, password: hashedPw, id: userId });
  await writeData(storedData);
  return { id: userId, email: data.email };
}

async function getAll() {
  const storedData = await readData();
  if (!storedData.users) {
    throw new NotFoundError('Could not find any users.');
  }
  return storedData.users;
}

async function get(email) {
  const storedData = await readData();
  if (!storedData.users || storedData.users.length === 0) {
    throw new NotFoundError('Could not find any users.');
  }

  const user = storedData.users.find((ev) => ev.email === email);
  if (!user) {
    throw new NotFoundError('Could not find user for email ' + email);
  }

  return user;
}

async function getById(id) {
  const storedData = await readData();
  if (!storedData.users || storedData.users.length === 0) {
    throw new NotFoundError('Could not find any users.');
  }

  const event = storedData.users.find((user) => user.id === id);
  if (!event) {
    throw new NotFoundError('Could not find event for id ' + id);
  }

  return event;
}

async function remove(id) {
  const storedData = await readData();
  const updatedData = storedData.users.filter((user) => user.id !== id);
  await writeData({ ...storedData, users: updatedData });
}

exports.add = add;
exports.get = get;
exports.getAll = getAll;
exports.remove = remove;
exports.getById = getById;


