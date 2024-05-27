import { readFile } from 'node:fs/promises'

const readJson = async (path) => {
  return JSON.parse(await readFile(path))
}

export default readJson
