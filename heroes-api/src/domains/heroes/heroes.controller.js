import { StatusCodes } from 'http-status-codes'

import model from './heroes.model.js'

/**
 * Create a new resource.
 *
 * @param {import('express').Request} req The Express.js request object
 * @param {import('express').Response} res The Express.js response object
 */
const create = async (req, res) => {
  try {
    const todo = await model.create(req.body)

    return res.status(StatusCodes.CREATED).json(todo)
  } catch (error) {
    console.log(error)

    if (error.message.includes(model.JSON_PROBLEM_MARKER)) {
      const jsonProblem = error.message
        .replace(`${model.JSON_PROBLEM_MARKER}: `, '')
        .replace('{PATH}', req.path)

      return res.status(StatusCodes.BAD_REQUEST).json(JSON.parse(jsonProblem))
    }

    return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

/**
 * Get all resources.
 *
 * @param {import('express').Request} req The Express.js request object
 * @param {import('express').Response} res The Express.js response object
 */
const getAll = async (req, res) => {
  try {
    const todos = await model.getAll()

    res.status(StatusCodes.OK).json(todos)
  } catch (error) {
    console.log(error)
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

/**
 * Get a resource by ID.
 *
 * @param {import('express').Request} req The Express.js request object
 * @param {import('express').Response} res The Express.js response object
 */
const getById = async (req, res) => {
  try {
    const todo = await model.getById(req.params.id)

    if (!todo) {
      return res.sendStatus(StatusCodes.NOT_FOUND)
    }

    res.status(StatusCodes.OK).json(todo)
  } catch (error) {
    console.error(error)

    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

/**
 * Delete a resource by ID.
 *
 * @param {import('express').Request} req The Express.js request object
 * @param {import('express').Response} res The Express.js response object
 */
const deleteById = async (req, res) => {
  try {
    const isDeleted = await model.deleteById(req.params.id)

    if (!isDeleted) {
      return res.sendStatus(StatusCodes.NOT_FOUND)
    }

    res.sendStatus(StatusCodes.NO_CONTENT)
  } catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

/**
 * Update a resource.
 *
 * @param {import('express').Request} req The Express.js request object
 * @param {import('express').Response} res The Express.js response object
 */
const update = async (req, res) => {
  try {
    const todo = await model.update(req.params.id, req.body)

    if (!todo) {
      return res.sendStatus(StatusCodes.NOT_FOUND)
    }

    res.status(StatusCodes.OK).json(todo)
  } catch (error) {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const controller = {
  create,
  getAll,
  getById,
  deleteById,
  update
}

export default controller
