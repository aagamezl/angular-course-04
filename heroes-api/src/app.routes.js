import { Router } from 'express'

import { heroesRouter } from './domains/heroes/index.js'
import { powersRouter } from './domains/powers/index.js'
import { router as usersRouter } from './domains/users/index.js'

const router = Router()

router.use('/', heroesRouter)
router.use('/', powersRouter)
router.use('/', usersRouter)

export default router
