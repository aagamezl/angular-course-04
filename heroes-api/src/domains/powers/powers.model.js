import { join } from 'node:path'

import config from '../../config.js'
import readJson from '../../utils/readJson.js';
import writeJson from '../../utils/writeJson.js';

const COLLECTION_PATH = join(config.database.path, 'powers.json')

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
  update
}

export default model
