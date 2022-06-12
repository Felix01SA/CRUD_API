import { Router } from 'express'
import InsController from '../controllers/InsController'

const router = Router()

router.post('/ins/create', InsController.create)
router.get('/ins', InsController.index)
router.get('/ins/find', InsController.show)
router.put('/ins/update', InsController.update)
router.delete('/ins/delete', InsController.delete)

export { router as InsRoutes }
