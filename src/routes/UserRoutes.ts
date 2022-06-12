import { Router } from 'express'
import UserController from '../controllers/UserController'

const router = Router()

router.post(`/user/register`, UserController.create)
router.post(`/user/login`, UserController.find)
router.put(`/user/update/:id`, UserController.update)
router.delete(`/user/delete/:id`, UserController.delete)

export { router as UserRouter }
