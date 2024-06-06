import express from 'express'

import controller from './heroes.controller.js'
import authenticate from '../../utils/middlewares/authentication.middleware.js'

const router = express.Router({ strict: true })

router.get('/heroes', authenticate, controller.getAll)
router.post('/heroes', authenticate, controller.create)
router.patch('/heroes/:id', authenticate, controller.update)
router.get('/heroes/:id', authenticate, controller.getById)
router.delete('/heroes/:id', authenticate, controller.deleteById)

export default router
