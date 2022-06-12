import { Router } from 'express'
import OutsController from '../controllers/OutsController'

const router = Router()

router.post('/outs/create', OutsController.create)
router.get('/outs', OutsController.index)
router.get('/outs/find', OutsController.show)
router.put('/outs/update', OutsController.update)
router.delete('/outs/delete', OutsController.delete)

export { router as OutsRoutes }
