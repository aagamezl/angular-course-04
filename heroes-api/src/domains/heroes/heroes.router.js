import express from 'express'

import controller from './heroes.controller.js'

const router = express.Router({ strict: true })

router.get('/heroes', controller.getAll)
router.post('/heroes', controller.create)
router.patch('/heroes/:id', controller.update)
router.get('/heroes/:id', controller.getById)
router.delete('/heroes/:id', controller.deleteById)

export default router
