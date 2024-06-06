import { join } from 'node:path'

import config from '../../config.js'
import readJson from '../../utils/readJson.js';
import signToken from '../../utils/authentication/signToken.js'
import writeJson from '../../utils/writeJson.js';
import verifyToken from '../../utils/authentication/verifyToken.js';

const COLLECTION_PATH = join(config.database.path, 'users.json')

const sequence = (initialValue = 1) => {
  let index = initialValue

  return () => ++index
}

const powersAmount = (await readJson(COLLECTION_PATH)).length
const primaryKey = sequence(powersAmount)

const create = async (payload) => {
  const powers = await readJson(COLLECTION_PATH)

  const hero = {
    id: primaryKey(),
    ...payload,
    createdAt: (new Date()).getTime(),
    updatedAt: (new Date()).getTime(),
  }

  powers.push(hero)

  await writeJson(COLLECTION_PATH, powers)

  return hero
}

const deleteById = async (id) => {
  /** @type {Array} */
  const powers = await readJson(COLLECTION_PATH)

  const index = powers.findIndex(todo => todo.id === Number(id))

  if (index === -1) {
    return false
  }

  powers.splice(index, 1)

  await writeJson(COLLECTION_PATH, powers)

  return true
}

const getAll = async () => {
  return readJson(COLLECTION_PATH)
}

const getById = async (id) => {
  const powers = await readJson(COLLECTION_PATH)
  return powers.find(hero => hero.id === Number(id))
}

const isLoggedIn = async (accessToken) => {
  const isValid = await verifyToken(accessToken, config.authentication.secretKey)

  return Boolean(isValid)
}

const login = async (email, password) => {
  const users = await readJson(COLLECTION_PATH)

  const user = users.find(item => item.email === email && item.password === password)

  if (!user) {
    return
  }

  const { authentication: { expiresIn, secretKey } } = config

  return signToken({ id: user.id, email }, expiresIn, secretKey)
}

const update = async (id, payload) => {
  const powers = await readJson(COLLECTION_PATH)

  const index = powers.findIndex(todo => todo.id === Number(id))

  if (index === -1) {
    return
  }

  powers[index] = { ...powers[index], ...payload, updatedAt: (new Date()).getTime() }

  await writeJson(COLLECTION_PATH, powers)

  return powers[index]
}

const model = {
  create,
  deleteById,
  getAll,
  getById,
  isLoggedIn,
  login,
  update
}

export default model
