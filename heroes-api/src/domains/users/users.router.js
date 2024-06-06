import express from 'express'

import controller from './users.controller.js'

const router = express.Router({ strict: true })

router.get('/users', controller.getAll)

router.get('/users', controller.getAll)

router.get('/users/is-logged-in', controller.isLoggedIn)

router.post('/users', controller.create)

router.post('/users/login', controller.login)

router.patch('/users/:id', controller.update)

router.get('/users/:id', controller.getById)

router.delete('/users/:id', controller.deleteById)

export default router
