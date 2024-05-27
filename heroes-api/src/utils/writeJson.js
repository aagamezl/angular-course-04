import { writeFile } from 'node:fs/promises'

/**
 * 
 * @param {string} path 
 * @param {*} data 
 */
const writeJson = async (path, data) => {
  writeFile(path, JSON.stringify(data, null, 2))
}

export default writeJson
