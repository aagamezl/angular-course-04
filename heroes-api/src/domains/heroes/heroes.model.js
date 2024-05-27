import { join } from 'node:path'

import config from '../../config.js'
import readJson from '../../utils/readJson.js';
import writeJson from '../../utils/writeJson.js';

const COLLECTION_PATH = join(config.database.path, 'heroes.json')

const sequence = (initialValue = 1) => {
  let index = initialValue

  return () => ++index
}

const heroesAmount = (await readJson(COLLECTION_PATH)).length
const primaryKey = sequence(heroesAmount)

const create = async (payload) => {
  const heroes = await readJson(COLLECTION_PATH)

  const hero = {
    id: primaryKey(),
    ...payload,
    createdAt: (new Date()).getTime(),
    updatedAt: (new Date()).getTime(),
  }

  heroes.push(hero)

  await writeJson(COLLECTION_PATH, heroes)

  return hero
}

const deleteById = async (id) => {
  /** @type {Array} */
  const heroes = await readJson(COLLECTION_PATH)

  const index = heroes.findIndex(todo => todo.id === Number(id))

  if (index === -1) {
    return false
  }

  heroes.splice(index, 1)

  await writeJson(COLLECTION_PATH, heroes)

  return true
}

const getAll = async () => {
  return readJson(COLLECTION_PATH)
}

const getById = async (id) => {
  const heroes = await readJson(COLLECTION_PATH)
  return heroes.find(hero => hero.id === Number(id))
}

const update = async (id, payload) => {
  const heroes = await readJson(COLLECTION_PATH)

  const index = heroes.findIndex(todo => todo.id === Number(id))

  if (index === -1) {
    return
  }

  heroes[index] = { ...heroes[index], ...payload, updatedAt: (new Date()).getTime() }

  await writeJson(COLLECTION_PATH, heroes)

  return heroes[index]
}

const model = {
  create,
  deleteById,
  getAll,
  getById,
  update
}

export default model
