import express from 'express'

import controller from './powers.controller.js'

const router = express.Router({ strict: true })

router.get('/powers', controller.getAll)

router.post('/powers', controller.create)

router.patch('/powers/:id', controller.update)

router.get('/powers/:id', controller.getById)

router.delete('/powers/:id', controller.deleteById)

export default router
