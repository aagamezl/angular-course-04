import jwt from 'jsonwebtoken'

/**
 * 
 * @param {Record<string, unknown>} data 
 * @param {string} expiresIn 
 * @param {string} secretKey 
 * @returns 
 */
const signToken = (data, expiresIn, secretKey) => {
  return new Promise((resolve, reject) => {
    jwt.sign(data, secretKey, { expiresIn }, (error, token) => {
      if (error) {
        return reject(error)
      }

      return resolve(token)
    })
  })
}

export default signToken
