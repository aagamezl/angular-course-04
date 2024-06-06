import jwt from 'jsonwebtoken'

/**
 * 
 * @param {string} token 
 * @param {string} secretKey 
 * @returns 
 */
const verifyToken = (token, secretKey) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (error, decoded) => {
      if (error) {
        return reject(error)
      }

      return resolve(decoded)
    });
  })
}

export default verifyToken
