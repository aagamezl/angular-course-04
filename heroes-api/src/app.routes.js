import { Router } from 'express'

import { heroesRouter } from './domains/heroes/index.js'
import { powersRouter } from './domains/powers/index.js'

const router = Router()

router.use('/', heroesRouter)
router.use('/', powersRouter)

export default router
