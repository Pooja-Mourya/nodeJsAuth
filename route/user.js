import express from 'express'
const router = express.Router()
import userController from '../controller/userController.js'

router.post('/userRegistration', userController.userRegistration)
router.post('/userLogin', userController.userLogin)

export default router
