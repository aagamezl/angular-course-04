import { StatusCodes } from 'http-status-codes'

import config from '../../config.js'
import { getToken, verifyToken } from '../authentication/index.js'

export const CONTENT_TYPE = 'application/vnd.api+json; charset=utf-8'

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns
 */
const authenticate = async (req, res, next) => {
  try {
    const authToken = getToken(req.headers.authorization)

    if (!authToken) {
      return res.set('Content-Type', CONTENT_TYPE).status(StatusCodes.FORBIDDEN).json({
        type: 'about:blank',
        status: StatusCodes.FORBIDDEN,
        title: 'AuthenticationTokenInvalid',
        details: 'The authentication token is invalid or has expired'
      })
    }

    // Verificar si el token es válido y no ha expirado
    const isValid = await verifyToken(authToken, config.authentication.secretKey)

    // si no se ha invalidado ese token con el endpoint logout
    if (!isValid) {
      return res.set('Content-Type', CONTENT_TYPE).status(StatusCodes.FORBIDDEN).json({
        type: 'about:blank',
        status: StatusCodes.FORBIDDEN,
        title: 'AuthenticationTokenInvalid',
        details: 'The authentication token is invalid or has expired'
      })
    }

    next()
  } catch (error) {
    return res.set('Content-Type', CONTENT_TYPE).status(StatusCodes.FORBIDDEN).json({
      type: 'about:blank',
      status: StatusCodes.FORBIDDEN,
      title: 'AuthenticationTokenNotFound',
      details: error.message
    })
  }
}

export default authenticate
